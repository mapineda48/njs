import React, { ReactNode } from "react";
import { usePromise, Task } from "hook/usePromise";
import { initApi, IDashboard } from "api";
import { useSubmit as useFormSubmit } from "Form";

const Context = React.createContext<null | IDashboard>(null);

export class ApiNotReadyError extends Error {
  constructor() {
    super("Api is not ready");
  }
}

export default function AgapeApiContext(props: Props) {
  return (
    <Context.Provider value={initApi()}>{props.children}</Context.Provider>
  );
}

export function useContextApi() {
  const api = React.useContext(Context);

  if (!api) {
    throw new ApiNotReadyError();
  }

  return api;
}

export function useApi<
  T extends (api: IDashboard) => (...args: any[]) => Promise<any>
>(
  cb: T
): T extends (api: IDashboard) => (...args: infer A) => Promise<infer R>
  ? Task<A, R>
  : unknown;
export function useApi(cb: any): any {
  const api = useContextApi();

  return usePromise(cb(api));
}

export function useApis<
  T extends (api: IDashboard, ...args: any[]) => Promise<any>
>(
  cb: T
): T extends (api: IDashboard, ...args: infer A) => Promise<infer R>
  ? Task<A, R>
  : unknown;
export function useApis(cb: any): any {
  const api = useContextApi();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const action = React.useCallback((...args: any[]) => cb(api, ...args), [api]);

  return usePromise(action);
}

export function useSubmit<
  T extends (api: IDashboard) => (...args: any[]) => Promise<any>
>(
  cb: T
): T extends (api: IDashboard) => (...args: infer A) => Promise<infer R>
  ? Task<A, R>[0]
  : unknown;
export function useSubmit(cb: any): any {
  const [task, api]: any = useApi(cb);
  useFormSubmit(api);

  return task;
}

export function useSubmitApis<
  T extends (api: IDashboard, ...args: any[]) => Promise<any>
>(
  cb: T
): T extends (api: IDashboard, ...args: infer A) => Promise<infer R>
  ? Task<A, R>[0]
  : unknown;
export function useSubmitApis(cb: any): any {
  const [task, api]: any = useApis(cb);
  useFormSubmit(api);

  return task;
}

/**
 * Types
 */
interface Props {
  children: ReactNode;
}
