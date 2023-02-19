import { useEffect, useState, useCallback, useRef } from "react";

const initState: InternalState = {
  isLoading: false,
  error: null,
  result: undefined,
  params: null,
};

export default function usePromise<R = any, P extends any[] = any[]>(
  cb: (setPromise: (promise: Promise<R>) => Promise<R>, ...args: P) => void
): [(...args: P) => void, State<R>];
export default function usePromise(cb: any) {
  const isMount = useRef(false);

  useEffect(() => {
    isMount.current = true;
    return () => {
      isMount.current = false;
    };
  });

  const isMounted = useCallback(() => isMount.current, [isMount]);

  const [state, setState] = useState({ ...initState });

  const setParams = useCallback((...params: any[]) => {
    setState({ ...initState, params });
  }, []);

  const setPromise: any = useCallback(
    (promise: Promise<any>) => {
      setState((state) => ({ ...state, isLoading: true }));

      promise
        .then((result) => {
          isMounted() &&
            setState((state) => ({
              ...state,
              isLoading: false,
              params: null,
              result,
            }));
        })
        .catch((error) => {
          isMounted() &&
            setState((state) => ({
              ...state,
              isLoading: false,
              params: null,
              error,
            }));
        });

      return promise;
    },
    [isMounted]
  );

  useEffect(() => {
    if (!state.params) {
      return;
    }

    return cb(setPromise, ...state.params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setPromise, state.params]);

  return [setParams, state] as any;
}

/**
 * Types
 */
interface InternalState extends State<any> {
  params: any;
}

interface State<T> {
  isLoading: boolean;
  error: any;
  result?: T;
}

export type Type<T = any> = T extends (...args: infer P) => Promise<infer R>
  ? [R, P]
  : [any, any[]];
