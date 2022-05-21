import React from "react";
import { ensureAction } from "../useState";

const useState = ensureAction({
  loading(state: State, isLoading = true): State {
    return { ...state, isLoading, isFirstCall: false, res: null, error: null };
  },
  res(state: State, res: any): State {
    if (!state.isLoading) return state;

    return { ...state, res, isLoading: false };
  },
  error(state: State, error: any): State {
    if (!state.isLoading) return state;

    return { ...state, error, isLoading: false };
  },
});

/**
 * Try to resolve the async callback passed as the second argument in the component's mount event, 
 * as well as the fourth value in the array, a callback that allows the same promise to be 
 * called again, but passing the arguments it receives.
 * @param waitCall false - indicates that the callback should be called as soon as the component is mounted
 * @param cb which will be called as soon as the component is mounted
 * @param args all other parameters passed to the binding are passed as parameters to the asynchronous callback during the first call
 */
export function usePromise<
  P,
  V extends any[] = P extends (...args: infer A) => Promise<any> ? A : never[],
  R = P extends (...args: V) => Promise<infer R> ? R : never
>(
  waitCall: false,
  promise: P,
  ...args: P extends (...args: infer A) => Promise<R> ? A : never[]
): [boolean, any, R | null, (...args: V) => Promise<{ error: any; res?: R }>];
/**
 * The callback must be called by the returned callback
 * @param waitCall true - indicates that the callback should be called by the returned callback
 * @param cb asyn callback
 */
export function usePromise<
  P,
  V extends any[] = P extends (...args: infer A) => Promise<any> ? A : never[],
  R = P extends (...args: V) => Promise<infer R> ? R : never
>(
  waitCall: true,
  promise: P
): [boolean, any, R | null, (...args: V) => Promise<{ error: any; res?: R }>];
/**
 * Try to resolve the asynchronous callback passed as the first argument in the component's 
 * mount event, the other arguments received are passed as arguments to this callback
 * @param cb which will be called as soon as the component is mounted
 * @param args all other parameters passed to the binding are passed as parameters to the asynchronous callback during the first call
 */
export function usePromise<
  P,
  V extends any[] = P extends (...args: infer A) => Promise<any> ? A : never[],
  R = P extends (...args: V) => Promise<infer R> ? R : never
>(
  promise: P,
  ...args: P extends (...args: infer A) => Promise<R> ? A : never[]
): [boolean, any, R | null];
export function usePromise(...vals: any[]): any {
  const [arg1, arg2, ...args] = vals;

  const isBoolArg1 = typeof arg1 === "boolean";

  const waitCall = isBoolArg1 && arg1;

  const promise = isBoolArg1 ? arg2 : arg1;

  const [{ res, error, isLoading, isFirstCall }, , hook] = useState({
    res: null,
    error: null,
    isLoading: false,
    isFirstCall: true,
  });

  const shouldCall = !res && !isLoading && !error && isFirstCall && !waitCall;

  React.useEffect(() => {
    if (!shouldCall) {
      return;
    }

    hook.loading();

    promise
      .call(null, ...args)
      .then((res: any) => hook.isMount() && hook.res(res))
      .catch((error: any) => hook.isMount() && hook.error(error));
  });

  const cb = React.useCallback(
    (...args: any[]) => {
      hook.loading();

      return new Promise<any>((res, rej) => {
        promise
          .call(null, ...args)
          .then((val: any) => {
            if (!hook.isMount()) {
              return;
            }

            hook.res(val);
            res({ error: null, res: val });
          })
          .catch((error: any) => {
            if (!hook.isMount()) {
              return;
            }

            hook.error(error);
            res({ error, res: null });
          });
      });
    },
    [hook, promise]
  );

  if (!isBoolArg1) {
    return [isLoading, error, res];
  }

  return [isLoading, error, res, cb];
}

/**
 * Types
 */
interface State {
  res: any;
  error: any;
  isLoading: boolean;
  isFirstCall: boolean;
}
