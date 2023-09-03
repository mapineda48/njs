import { pblic as api, pblic } from "../baseUrl";

export const route = api<IApi>(["authenticate"]);

export default route;

/**
 * Types
 */
export interface IApi {
  authenticate: SigIn;
}

export type SigIn = (credential: Authentication) => Promise<string>;

export interface Authentication {
  agape?: string;
  shop?: string;
}
