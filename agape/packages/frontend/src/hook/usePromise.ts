import { useCallback, useEffect, useState } from "react";

export function usePromise<T>(
  cb: T
): T extends (...args: infer A) => Promise<infer R> ? Task<A, R> : unknown;
export function usePromise(cb: any): any {
  const [state, setState] = useState<State>({});

  const setArgs: any = useCallback((...args: Args) => setState({ args }), []);
  const setResult = useCallback((result?: unknown) => setState({ result }), []);
  const setError = useCallback((error: unknown) => setState({ error }), []);

  const { args, error, result } = state;

  useEffect(() => {
    if (!args) {
      return;
    }

    let onSuccess: Callback = setResult;
    let onError: Callback = setError;

    cb(...args)
      .then((res: unknown) => onSuccess && onSuccess(res))
      .catch((err: unknown) => onError && onError(err));

    return () => {
      onSuccess = null;
      onError = null;
    };
  }, [args, cb, setError, setResult]);

  const task = {
    result,
    loading: Boolean(args),
    error,
    reset: () => setResult(),
  };

  return [task, setArgs];
}

export function wait(timeout = 1000) {
  return new Promise((res) => {
    setTimeout(res, timeout);
  });
}

/**
 * Types
 */

export type Task<A extends unknown[], R> = [
  { loading: boolean; result?: R; error?: Error; reset: () => void },
  (...args: A) => void
];

type Callback = ((val: unknown) => void) | null;

interface State {
  args?: unknown[];
  error?: unknown;
  result?: unknown;
}

type Args = unknown[];
