import { useCallback, useEffect, useState } from "react";

const initState: State = {
  args: null,
  error: undefined,
  result: undefined,
};

export function usePromise<T>(
  cb: T
): T extends (...args: infer A) => Promise<infer R>
  ? AsyncAction<A, R>
  : unknown;
export function usePromise(cb: any): any {
  const [state, setState] = useState<State>({ ...initState });

  const setArgs: any = useCallback(
    (...args: unknown[]) => setState({ ...initState, args }),
    []
  );

  const setResult = useCallback(
    (result: unknown) => setState({ ...initState, result }),
    []
  );

  const setError = useCallback(
    (error: unknown) => setState({ ...initState, error }),
    []
  );

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

  setArgs.loading = Boolean(args);
  setArgs.result = result;
  setArgs.error = error;

  return setArgs;
}

export function wait(timeout = 1000) {
  return new Promise((res) => {
    setTimeout(res, timeout);
  });
}

/**
 * Types
 */

export type AsyncAction<A extends unknown[], R> = {
  (...args: A): void;
  loading: boolean;
  result?: R;
  error?: Error;
};

type Callback = ((val: unknown) => void) | null;

interface State {
  args: unknown[] | null;
  error: unknown;
  result: unknown;
}
