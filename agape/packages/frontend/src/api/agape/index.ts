import { AxiosInstance } from "axios";
import { routeAgape as routeApi, IModelApi, IAgapeApi } from "backend";
import setNotJsonRequest from "./uploadPublic";
import { initApi as initModelApi } from "api/model";

export function initApi(axios: AxiosInstance, map = routeApi): IDashboard {
  const api: any = Object.fromEntries(
    Object.entries(map).map(([methodName, route]: any) => {
      if (typeof route !== "string") {
        return [methodName, initApi(axios, route)];
      }

      const method = (...args: unknown[]) => {
        return axios.post(route, args).then((res) => res.data);
      };

      return [methodName, method];
    })
  );

  setNotJsonRequest(api, axios);

  api.model = initModelApi(axios);

  return api;
}

/**
 * Types
 */
export interface IDashboard extends IAgapeApi {
  model: IModelApi;
}
