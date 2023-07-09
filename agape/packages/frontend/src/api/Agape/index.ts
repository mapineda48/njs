import { AxiosInstance } from "axios";
import { routeAgape, IAgapeApi as IDashboardApi } from "backend";
import uploadPublic from "./uploadPublic";
import { Models } from "api/Models";

export function createApi(axios: AxiosInstance, map = routeAgape): IAgapeApi {
  const api: any = Object.fromEntries(
    Object.entries(map).map(([methodName, route]: any) => {
      if (typeof route !== "string") {
        return [methodName, createApi(axios, route)];
      }

      const method = (...args: unknown[]) => {
        return axios.post(route, args).then((res) => res.data);
      };

      return [methodName, method];
    })
  );

  uploadPublic(api, axios);

  api.model = new Models(axios);

  return api;
}

/**
 * Types
 */
export interface IAgapeApi extends IDashboardApi {
  model: Models;
}
