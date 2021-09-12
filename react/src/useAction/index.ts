import React, { useMemo } from "react";

const isDev = process.env.NODE_ENV === "development";

export function isFunc(val: any): val is (...args: any[]) => any {
  return typeof val === "function";
}

export function createSync<S, R>(
  setState: SetState<S>,
  reducer: R
): Action<S, R>;
export function createSync(setState: any, red: any) {
  const res: any = { setState };

  Object.entries(red).forEach(([key, val]) => {
    if (!isFunc(val)) return;

    res[key] = (...args: any[]) => {
      setState((state: any) => val.call(null, state, ...args));
      return res;
    };
  });

  return res;
}

export function createAsync<T, R>(dispatch: T, reducer: R): AsyncAction<T, R>;
export function createAsync(dispatch: any, red: any) {
  const res: any = {};

  Object.entries(red).forEach(([key, val]) => {
    if (!isFunc(val)) return;

    res[key] = (...args: any[]) => {
      return val.call(null, dispatch, ...args);
    };
  });

  return res;
}

export function createThunk<T, D, R>(
  setState: T,
  dispatch: D,
  reducer: R
): ThunkAction<T, D, R>;
export function createThunk(setState: any, dispatch: any, red: any) {
  const res: any = {};

  Object.entries(red).forEach(([key, red]) => {
    if (!isFunc(red)) return;

    res[key] = (...args: any[]) => {
      const thunk = red(...args);

      return new Promise((res, rej) => {
        setState((state: any) => {
          const prom = thunk(state, dispatch);

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
  });

  return res;
}

export const useThunk: CreateThunk = (setState, dispatch, reducer) => {
  return React.useMemo(
    () => createThunk(setState, dispatch, reducer),
    [setState, dispatch, reducer]
  );
};

export const useAsync: CreateAsync = (dispatch, reducer) => {
  return React.useMemo(
    () => createAsync(dispatch, reducer),
    [dispatch, reducer]
  );
};

/**
 * ok ... what you found here is a proposal for the implementation of an alternative
 * to redux and useReducer, also simplifying the API (or at least that's what I try),
 * its use is intended for small to medium applications, which is just a project to
 * test what you have learned about react.
 */
export const useAction: CreateSync = (setState, reducer) => {
  return React.useMemo(
    () => createSync(setState, reducer),
    [setState, reducer]
  );
};

export default useAction;

export const action: MainAction = createSync as any;

action.async = createAsync;
action.thunk = createThunk;

/**
 * Types
 */
export type CreateThunk = typeof createThunk;

export type ThunkAction<T, D, R> = T extends SetState<infer S>
  ? {
      readonly [K in keyof R]: R[K] extends (
        ...args: infer A
      ) => (state: S, dispatch: D) => Promise<infer U>
        ? (...args: A) => Promise<U>
        : never;
    }
  : never;

export type CreateAsync = typeof createAsync;

export type AsyncAction<T, R> = {
  readonly [K in keyof R]: R[K] extends (
    setState: T,
    ...args: infer A
  ) => infer U
    ? (...args: A) => U
    : never;
};

export type CreateSync = typeof createSync;

export type Action<S, R> = {
  readonly [K in keyof R]: R[K] extends (state: S, ...args: infer A) => S
    ? (...args: A) => Action<S, R>
    : never;
};

export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

type MainAction = CreateSync & { async: CreateAsync; thunk: CreateThunk };
