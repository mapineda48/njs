import * as Public from "./public";
import * as model from "./model";
import * as agape from "./agape";
import * as shop from "./shop";

export const route = {
  ...Public.route,
  model: model.route,
  agape: agape.route,
  shop: shop.route,
};

export const client = {
  agape: agape.client,
};

export const AgapeHeader = "agape";
export const ShopHeader = "shop";
export const Auth = ":"

/**
 * Types
 */
export interface IApi extends Public.IApi {
  model?: model.IApi;
  agape?: agape.IApi;
  shop?: shop.IApi;
}
