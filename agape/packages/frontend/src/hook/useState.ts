import React from "react";

/**
 * Imagining a lite version of redux, and that each action has its own reducer
 * @param reducer reducer
 */
export function initReducer<T>(
  reducer: T
): T extends { [key: string]: (state: infer S, ...args: any[]) => any }
  ? T extends { [key: string]: (state: S, ...args: any) => S }
    ? (initState: S | (() => S)) => [S, Action<S, T>, SetState<S>]
    : never
  : never;
export function initReducer(red: any): any {
  return function useStateAction(val: any) {
    const [state, setState] = React.useState(val);

    const action: any = React.useMemo(() => {
      return Object.fromEntries(
        Object.entries(red)
          // Only functions
          .filter(([, val]) => isFunc(val))
          // use setState with actions
          .map(([key, val]: any) => {
            return [
              key,
              function (this: any, ...args: any[]) {
                setState((state: any) => val.call(null, state, ...args));
                return this;
              },
            ];
          })
      );
    }, [setState]);

    return [state, action, setState];
  };
}

export function isFunc(val: any): val is (...args: any[]) => any {
  return typeof val === "function";
}

/**
 * Types
 */
export type Action<S, R> = {
  readonly [K in keyof R]: R[K] extends (state: S, ...args: infer A) => S
    ? (...args: A) => Action<S, R>
    : never;
};

export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;
