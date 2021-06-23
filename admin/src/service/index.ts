export const api = {
  config: "api/config",
  isToken: "api/is-token",
  login: "api/login",
};

/**
 * Types
 */
export interface ReqLogIn {
  user: string;
  password: string;
}

export interface ResLogIn {
  token: string;
}

export interface ResIsToken {
  isToken: boolean;
}

export type ReqIsToken = ResLogIn;
