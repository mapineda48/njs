import React, { ReactNode } from "react";
import axios from "axios";
import { usePromise, AsyncAction } from "hook/usePromise";
import { createApi, IAgapeApi } from "api/Agape";

const baseURL = "http://localhost:5000";
const Context = React.createContext<null | IAgapeApi>(null);

export default function AgapeApiContext(props: Props) {
  const instance = axios.create({
    baseURL,
  });

  const api = createApi(instance);

  return <Context.Provider value={api}>{props.children}</Context.Provider>;
}

export function useContextApi() {
  const api = React.useContext(Context);

  if (!api) {
    throw new ApiNotReadyError();
  }

  return api;
}

export function useApi<
  T extends (api: IAgapeApi) => (...args: any[]) => Promise<any>
>(
  cb: T
): T extends (api: IAgapeApi) => (...args: infer A) => Promise<infer R>
  ? AsyncAction<A, R>
  : unknown;
export function useApi(cb: any): any {
  const api = useContextApi();

  return usePromise(cb(api));
}

export function useApis<
  T extends (api: IAgapeApi, ...args: any[]) => Promise<any>
>(
  cb: T
): T extends (api: IAgapeApi, ...args: infer A) => Promise<infer R>
  ? AsyncAction<A, R>
  : unknown;
export function useApis(cb: any): any {
  const api = useContextApi();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const action = React.useCallback((...args: any[]) => cb(api, ...args), [api]);

  return usePromise(action);
}

export class ApiNotReadyError extends Error {
  constructor() {
    super("Api is not ready");
  }
}

/**
 * Types
 */
interface Props {
  children: ReactNode;
}
