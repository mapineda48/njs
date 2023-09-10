import * as agape from "./type/agape";
import { IApi, route } from "../agape";
import { IApi as IModel } from "../model";
import axios from "../axios";
import { initModels } from "../model/util/client";
import { initApi } from "./util";

/**
 * Authenticate
 */
export const sigin: agape.Authenticate = (...args: unknown[]) => {
  const http = axios();

  return http.post<agape.Auth>(agape.route, args).then(({ data }) => data);
};

export const authenticate: Authenticate = async (...args: [string]) => {
  const { token, user } = await sigin(...args);

  const session = axios({ headers: { token } });
  const api = initApi(session, route) as IApi;
  const model = initModels(session);

  return { user, api, model, token };
};

export default authenticate;

/**
 * Types
 */
export interface Authenticate {
  (token: string): Promise<Auth>;
  (username: string, password: string): Promise<Auth>;
}

export interface Auth extends agape.Auth {
  api: IApi;
  model: IModel;
}

export type User = agape.User;
