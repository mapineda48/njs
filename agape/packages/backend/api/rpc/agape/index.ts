import lodash from "lodash";
import axios, { create } from "../axios";
import api from "../api";
import initModels, { IModel } from "../model";
import { initApi } from "./util";
import custom from "./custom";
import type SigIn from "../../auth/agape";
import type { Auth, User } from "../../auth/agape";
import type IAgape from "../../agape";

export const sigin: SigIn = async (...args: string[]) => {
  const { auth } = await api();

  return axios.post<Auth>(auth.agape, args).then(({ data }) => data);
};

const authenticate: Authenticate = async (...args: [string]) => {
  const { user, token } = await sigin(...args);
  const { models, agape } = await api();

  const session = create({ headers: { token } });

  const foo = lodash.merge(structuredClone(agape), custom);

  return {
    token,
    user,
    models: initModels(session, models),
    api: initApi<IAgape>(session, foo, agape),
  };
};

export default authenticate;

/**
 * Types
 */

export interface Authenticate {
  (token: string): Promise<Session>;
  (username: string, password: string): Promise<Session>;
}

export interface Session {
  token: string;
  user: User;
  models: IModel;
  api: IAgape;
}
