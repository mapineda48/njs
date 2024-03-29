import { useCallback, useEffect, useState } from "react";
import useIsMounted from "hook/useIsMounted";
import { useSession } from "./Session";
import ProtectedApi from "api/protected";
import RequestPromise from "api/RequestPromise";

export default function useApi<T, P extends any[]>(
  cb: (api: ProtectedApi) => (...args: P) => RequestPromise<T>
): [(...args: P) => void, State<T>, () => void];
export default function useApi(factory: any) {
  const isMounted = useIsMounted();

  const [state, setState] = useState(initState);

  const setParams = useCallback((...params: any[]) => {
    setState((state: any) => {
      if (state.params) {
        return state;
      }

      return { ...initState, params }
    });
  }, []);

  const session = useSession();

  const { params, result, error } = state;

  useEffect(() => {
    if (!params) {
      return;
    }
    const cb = factory(session);

    const promise: RequestPromise<any> = cb(...(params as any[]));

    promise
      .then((result) => {
        isMounted() &&
          setState((state) => ({
            ...state,
            params: null,
            result,
          }));
      })
      .catch((error) => {
        isMounted() &&
          setState((state) => ({
            ...state,
            params: null,
            error,
          }));
      });

    return () => {
      promise.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, isMounted, params]);

  const res = { result, error, isLoading: Boolean(params) };

  const clear = useCallback(() => setState(initState), []);

  return [setParams, res, clear] as any;
}

export function initState(): StateHook {
  return {
    error: null,
    result: undefined,
    params: null,
  }
}

/**
 * Types
 */
interface State<T> {
  error: any;
  result?: T;
  isLoading: boolean
}

interface StateHook {
  error: any;
  result: any;
  params: any;
}
