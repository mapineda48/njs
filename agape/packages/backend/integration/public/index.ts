import { IApi, toRoute } from "../agape/util";

export const baseUrl = "/api";

export const route = toRoute<IBackend>(baseUrl, {
  authenticate: "authentication/authenticate",
});

/**
 * Types
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IBackend {
  authenticate(credential: Authentication): Promise<string>;
}

export type IFrontEnd = IApi<IBackend>;

export interface Authentication {
  agape?: string;
  shop?: string;
}
