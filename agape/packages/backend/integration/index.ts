/**
 * No backend dependencies should be imported in this file, only shared logic between
 * frontend and backend
 */

export * as query from "./model/util/query";
export { Op } from "./model/util/Op";
export { route as routeModel } from "./model";
export type { IFrontEnd as IModelApi } from "./model";

export { route as routePublic } from "./public";
export type { IFrontEnd as IPublicApi } from "./public";

export { route as routeAgape } from "./agape";
export type { IFrontEnd as IAgapeApi } from "./agape";

export const AgapeHeader = "agape";
export const ShopHeader = "shop";
export const TokenHeader = "token=";
