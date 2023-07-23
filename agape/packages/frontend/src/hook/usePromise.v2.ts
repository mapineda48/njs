import { useCallback, useEffect, useState } from "react";

export function usePromise<T, R>(opt: {
  onCall: T;
  notReset?: boolean;
  initial?: R;
}): T extends (...args: infer A) => Promise<infer R> ? Task<A, R> : unknown;
export function usePromise<T>(
  onCall: T
): T extends (...args: infer A) => Promise<infer R> ? Task<A, R> : unknown;
export function usePromise(opt: any): any {
  const {
    onCall,
    notReset = false,
    initial = undefined,
  } = typeof opt === "function" ? { onCall: opt } : opt;

  const [state, setState] = useState<State>({
    args: null,
    notReset,
    initial,
    result: initial,
  });

  const setArgs: any = useCallback(
    (...args: unknown[]) =>
      setState(({ notReset, result, initial }) => {
        return { initial, notReset, result: notReset ? result : initial, args };
      }),
    []
  );

  const setResult = useCallback(
    (result: unknown) =>
      setState(({ notReset, initial }) => ({
        notReset,
        initial,
        result: result ?? initial,
        args: null,
      })),
    []
  );

  const setError = useCallback(
    (error: unknown) =>
      setState(({ notReset, initial }) => ({
        notReset,
        initial,
        error,
        args: null,
      })),
    []
  );

  const { args, error, result } = state;

  useEffect(() => {
    if (!args) {
      return;
    }

    let onSuccess: Callback = setResult;
    let onError: Callback = setError;

    onCall(...args)
      .then((res: unknown) => onSuccess && onSuccess(res))
      .catch((err: unknown) => onError && onError(err));

    return () => {
      onSuccess = null;
      onError = null;
    };
  }, [args, onCall, setError, setResult]);

  const task = {
    result,
    loading: Boolean(args),
    error,
    reset: () => setResult(undefined),
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
  args: unknown[] | null;
  error?: unknown;
  result?: unknown;
  notReset?: boolean;
  initial?: unknown;
}
