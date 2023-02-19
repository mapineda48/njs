/**
 * No backend dependencies should be imported in this file, only shared logic between
 * frontend and backend
 */
export * from "./sequelize/type";
export * as User from "../model/user/type";

/**
 * https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#operators
 */
export const Op: Op;

/**
 * Params query to sequelize find options
 */
export const findOptions: string;

/**
 * route path api
 */
export const apiPath: ApiPath;

export function createModelApiPath(baseURL: string): ModelApiPath;

export interface ModelApiPath {
  create: string;
  update: string;
  destroy: string;
  search: string;
  findAll: string;
  count: string;
  findAndCountAll: string;
}

/**
 * Types
 */
type Json = typeof import("./Op.json");
type Op = { [K in keyof Json]: unique symbol };
type ApiPath = typeof import("./apiPath.json");
