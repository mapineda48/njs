import http, { AxiosInstance, CreateAxiosDefaults } from "axios";

/**
 *
 */
export const baseURL =
  process.env.NODE_ENV === "production" ? "/" : "http://localhost:5000";

/**
 * Create axios intance with baseUrl
 */
export function axios(config?: Omit<CreateAxiosDefaults, "baseUrl">) {
  return http.create({ ...config, baseURL });
}

export function initApi<T extends object>(
  axios: AxiosInstance,
  route: Route
): T {
  const api: T = Object.fromEntries(
    Object.entries(route).map(([methodName, route]: any) => {
      if (typeof route !== "string") {
        return [methodName, initApi(axios, route)];
      }

      const method = (...args: unknown[]) => {
        console.log("fetch "+ route)
        return axios.post(route, args).then((res) => res.data);
      };

      return [methodName, method];
    })
  );

  return api;
}

/**
 * Types
 */
interface Route {
  [K: string]: string;
}
