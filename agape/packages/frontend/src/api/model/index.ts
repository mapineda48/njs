import { AxiosInstance } from "axios";
import { routeModel as routeApi, IModelApi } from "backend";
import { prepareApi } from "./util";
import parse from "./parse";

export function initApi(axios: AxiosInstance) {
  const api: unknown = Object.fromEntries(
    Object.entries(routeApi).map(([methodName, route]: any) => {
      const method = prepareApi(route, axios, parse[methodName]);

      return [methodName, method];
    })
  );

  return api as IModelApi;
}
