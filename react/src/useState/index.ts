import React from "react";

/**
 * Well, I'm still learning about how javascript engines work (V8), feel free to leave me a 
 * comment if you notice any bad practices.
 */

/**
 * This function creates a closure, returns a React.useState wrapper, which won't update the state
 * if the component isn't mounting, not sure if I still have a memory leak, use with caution.
 */
export function createSetStateAsync(): typeof React.useState {
  let mount = false;

  return function useStateIfIsMount(val: any): any {
    React.useEffect(() => {
      mount = true;

      return () => {
        mount = false;
      };
    });

    const [state, setState] = React.useState(val);

    const setStateIfIsMount = React.useCallback(
      (val: any) => {
        if (!mount) return;

        setState(val);
      },
      [setState]
    );

    return [state, setStateIfIsMount];
  } as any;
}

/**
 * Imagining a lite version of redux, and that each action has its own reducer
 * @param reducer reducer
 */
export const initActionAsync: typeof initAction = (red) => {
  return (initAction as any)(red, createSetStateAsync());
};

/**
 * Imagining a lite version of redux, and that each action has its own reducer
 * @param reducer reducer
 */
export function initAction<T>(
  reducer: T
): T extends { [key: string]: (state: infer S, ...args: any[]) => any }
  ? T extends { [key: string]: (state: S, ...args: any) => S }
    ? (initState: S | (() => S)) => [S, SetState<S>, Action<S, T>]
    : never
  : never;
export function initAction(red: any, useState = React.useState): any {
  return function useStateAction(val: any) {
    const [state, setState] = useState(val);

    const action = React.useMemo(() => createAction(setState, red), [setState]);

    return [state, setState, action];
  };
}

export function createAction<S, R>(
  setState: SetState<S>,
  reducer: R
): Action<S, R>;
export function createAction(setState: any, action: any) {
  return Object.fromEntries(
    Object.entries(action)
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
