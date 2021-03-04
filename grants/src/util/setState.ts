import React from "react";

/**
 * https://debugpointer.com/check-if-an-object-is-a-promise/
 */
export function isPromise(p: any): p is Promise<any> {
  return p && Object.prototype.toString.call(p) === "[object Promise]";
}

const createAction: Create = (setState, reducer: any) => {
  /**
   * Warning that this is experimental, it is possible to lose the current state reference
   */
  function getState(): any {
    return new Promise((resolve, reject) => {
      setState((state) => {
        resolve(state);
        return state;
      });
    });
  }

  const result: any = { getState };

  Object.keys(reducer).forEach((key: any) => {
    const value: Function = reducer[key];

    if (typeof value !== "function") {
      return;
    }

    result[key] = (...args: any[]) => {
      // if (process.env.NODE_ENV === "development") {
      //   console.log(`call ${key}`);
      // }

      return setState((state) => value.call(null, state, ...args) || state);
    };
  });

  return result;
};

const createThunk: CreateThunk = (action, reducer: any) => {
  const result: any = {};

  Object.keys(reducer).forEach((key) => {
    const value: Function = reducer[key];

    if (typeof value !== "function") {
      return;
    }

    result[key] = (...args: any[]) => value.call(null, action, ...args);
  });

  return result;
};

export const useThunk: CreateThunk = (action, reducer) => {
  return React.useMemo(() => createThunk(action, reducer), [action, reducer]);
};

export const useAction: Create = (setState, reducer) => {
  return React.useMemo(() => createAction(setState, reducer), [
    setState,
    reducer,
  ]);
};

export default useAction;

/**
 * Typings
 */

export type Action<T = any, S = any> = {
  readonly [K in keyof T]: T[K] extends (state: S, ...args: infer A) => S
    ? (...args: A) => void
    : never;
} & {
  getState: () => Promise<S>;
};

type Thunk<T, A> = {
  readonly [K in keyof T]: T[K] extends (
    action: A,
    ...args: infer A
  ) => Promise<infer B>
    ? (...args: A) => Promise<B>
    : never;
};

type Create = <T, R>(
  setState: React.Dispatch<React.SetStateAction<T>>,
  reducer: R
) => Action<R, T>;

type CreateThunk = <A, T>(action: A, reducer: T) => Thunk<T, A>;
