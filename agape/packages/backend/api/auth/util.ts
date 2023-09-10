import { AxiosInstance } from "../axios";

export function initApi(axios: AxiosInstance, map: IMap) {
  const api: unknown = Object.fromEntries(
    Object.entries(map).map(([methodName, route]: any) => {
      if (typeof route === "string") {
        const method = (...args: unknown[]) => {
          return axios.post(route, args).then((res) => res.data);
        };

        return [methodName, method];
      }

      if (typeof route === "function") {
        return [methodName, (...args: unknown[]) => route(axios, ...args)];
      }

      return [methodName, initApi(axios, route)];
    })
  );

  return api;
}

/**
 * Types
 */
interface IMap {
  [K: string]: string | IMap;
}
