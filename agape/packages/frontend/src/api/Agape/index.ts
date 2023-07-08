import { AxiosInstance } from "axios";
import Request from "../Model/Util/Request";
import { routeAgape, IAgapeApi } from "backend";
import uploadPublic from "./uploadPublic";

export function createApi(axios: AxiosInstance, map = routeAgape): IAgapeApi {
  const api: any = Object.fromEntries(
    Object.entries(map).map(([methodName, route]: any) => {
      if (typeof route !== "string") {
        return [methodName, createApi(axios, route)];
      }

      const method = (...args: unknown[]) => {
        return new Request((signal) => {
          return axios.post(route, args, { signal }).then((res) => res.data);
        });
      };

      return [methodName, method];
    })
  );

  uploadPublic(api, axios);
  
  return api;
}