import React from "react";
import { useStateSession } from "../useStateSession";

/**
 * Well, I'm still learning about how javascript engines work (V8), feel free to leave me a
 * comment if you notice any bad practices.
 */
/**
 * Keep state mount componente
 */
const mount = Symbol();

/**
 * This function creates a closure, returns a React.useState wrapper, which won't update the state
 * if the component isn't mounting, not sure if I still have a memory leak, use with caution.
 * @deprecated memory leaks
 */
export function ensureAction<T>(
  reducer: T
): T extends { [key: string]: (state: infer S, ...args: any[]) => any }
  ? T extends { [key: string]: (state: S, ...args: any) => S }
    ? (
        initState: S | (() => S)
      ) => [S, SetState<S>, { isMount: () => boolean } & Action<S, T>]
    : never
  : never;
export function ensureAction(red: any): any {
  return function useStateAction(val: any) {
    const [state, setState] = React.useState(val);

    const action: any = React.useMemo(() => {
      const res = Object.fromEntries(
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

      res[mount] = false;

      res.isMount = function isMount() {
        return this[mount];
      };

      return res;
    }, [setState]);

    React.useEffect(() => {
      action[mount] = true;

      return () => {
        action[mount] = false;
      };
    });

    return [state, setState, action];
  };
}

/**
 * Imagining a lite version of redux, and that each action has its own reducer
 * @param reducer reducer
 */
export function initSession<T>(
  reducer: T
): T extends { [key: string]: (state: infer S, ...args: any[]) => any }
  ? T extends { [key: string]: (state: S, ...args: any) => S }
    ? (key: string, initState: S | (() => S)) => [S, SetState<S>, Action<S, T>]
    : never
  : never;
export function initSession(red: any): any {
  return function useStateAction(key: string, val: any) {
    const [state, setState] = useStateSession(key, val);

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

    return [state, setState, action];
  };
}

/**
 * Imagining a lite version of redux, and that each action has its own reducer
 * @param reducer reducer
 */
export function initReducer<T>(
  reducer: T
): T extends { [key: string]: (state: infer S, ...args: any[]) => any }
  ? T extends { [key: string]: (state: S, ...args: any) => S }
    ? (initState: S | (() => S)) => [S, SetState<S>, Action<S, T>]
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

    return [state, setState, action];
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
