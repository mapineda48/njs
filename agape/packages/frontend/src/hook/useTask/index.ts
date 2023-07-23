import { useEffect } from "react";
import useState from "./state";

export function useTask<T, R>(opt: {
  onCall: T;
  notReset?: boolean;
  initial?: R;
}): T extends (...args: infer A) => Promise<infer R> ? Task<A, R> : unknown;
export function useTask(opt: any): any {
  const { onCall, notReset = false, initial = undefined } = opt;

  const [state, task] = useState({
    notReset,
    initial,
    result: initial,
  });

  const { args, error, result } = state;

  useEffect(() => {
    if (!args) {
      return;
    }

    let onSuccess: Callback = task.setResult;
    let onError: Callback = task.setError;

    onCall(...args)
      .then((res: unknown) => onSuccess && onSuccess(res))
      .catch((err: unknown) => onError && onError(err));

    return () => {
      onSuccess = null;
      onError = null;
    };
  }, [args, onCall]);

  return [
    {
      result,
      loading: Boolean(args),
      error,
      reset: () => task.setResult(),
    },
    task.setArgs,
  ];
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
