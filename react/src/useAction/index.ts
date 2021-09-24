import React from "react";

const isDev = process.env.NODE_ENV === "development";

/**
 * initialize react hook useState with reducer actions
 * @param reducer reducer
 */
export function initAction<T>(
  reducer: T
): T extends { [key: string]: (state: infer S, ...args: any[]) => any }
  ? T extends { [key: string]: (state: S, ...args: any) => S }
    ? (initState: S | (() => S)) => [S, SetState<S>, Action<S, T>]
    : never
  : never;
export function initAction(red: any): any {
  return function useStateAction(val: any) {
    const [state, setState] = React.useState(val);

    const action = React.useMemo(() => createAction(setState, red), [setState]);

    return [state, setState, action];
  };
}

export function isFunc(val: any): val is (...args: any[]) => any {
  return typeof val === "function";
}

export function createAction<S, R>(
  setState: SetState<S>,
  reducer: R
): Action<S, R>;
export function createAction(setState: any, red: any) {
  return Object.fromEntries(
    Object.entries(red)
      // Only functions
      .filter(([, val]) => isFunc(val))
      // use setState with actions
      .map(([key, val]: any) => {
        const action = function (this: any, ...args: any[]) {
          setState((state: any) => val.call(null, state, ...args));
          return this;
        };
        return [key, action];
      })
  );
}

export function createThunk<T, R>(setState: T, reducer: R): ThunkAction<T, R>;
export function createThunk(setState: any, red: any) {
  return Object.fromEntries(
    Object.entries(red)
      .filter(([, val]) => isFunc(val))
      .map(([key, val]: any) => {
        const action = (...args: any[]) => {
          const thunk = val(...args);

          return new Promise((res, rej) => {
            setState((state: any) => {
              const prom = thunk(state);

              if (isDev) {
                if (!prom.then) {
                  rej(new Error("thunk must return a promise"));
                }
              }
              prom.then(res).catch(rej);
              return state;
            });
          });
        };

        return [key, action];
      })
  );
}

export const useThunk: CreateThunk = (setState, reducer) => {
  return React.useMemo(
    () => createThunk(setState, reducer),
    [setState, reducer]
  );
};

/**
 * ok ... what you found here is a proposal for the implementation of an alternative
 * to redux and useReducer, also simplifying the API (or at least that's what I try),
 * its use is intended for small to medium applications, which is just a project to
 * test what you have learned about react.
 */
export const useAction: createAction = (setState, reducer) => {
  return React.useMemo(
    () => createAction(setState, reducer),
    [setState, reducer]
  );
};

export default useAction;

export function action<S>(setState: SetState<S>) {
  return {
    sync<R>(reducer: R) {
      return createAction(setState, reducer);
    },
    thunk<R>(reducer: R) {
      return createThunk(setState, reducer);
    },
  };
}

/**
 * Types
 */
export type CreateThunk = typeof createThunk;

export type ThunkAction<T, R> = T extends SetState<infer S>
  ? {
      readonly [K in keyof R]: R[K] extends (
        ...args: infer A
      ) => (state: S) => Promise<infer U>
        ? (...args: A) => Promise<U>
        : never;
    }
  : never;

export type AsyncAction<T, R> = {
  readonly [K in keyof R]: R[K] extends (
    setState: T,
    ...args: infer A
  ) => infer U
    ? (...args: A) => U
    : never;
};

export type createAction = typeof createAction;

export type Action<S, R> = {
  readonly [K in keyof R]: R[K] extends (state: S, ...args: infer A) => S
    ? (...args: A) => Action<S, R>
    : never;
};

export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;
