import { AxiosInstance as Axios } from "axios";

export function initApi<T>(axios: Axios, map: IMap, path: IMap) {
  const api: unknown = Object.fromEntries(
    Object.entries(map).map(([methodName, route]: any) => {
      if (typeof route === "string") {
        const method = (...args: unknown[]) => {
          return axios.post(route, args).then((res) => res.data);
        };

        return [methodName, method];
      }

      if (typeof route === "function") {
        const method = (...args: unknown[]) => route(path, axios, ...args);
        return [methodName, method];
      }

      return [methodName, initApi(axios, route, path)];
    })
  );

  return api as T;
}

/**
 * Types
 */
interface IMap {
  [K: string]: string | IMap;
}
