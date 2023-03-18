/**
 * No backend dependencies should be imported in this file, only shared logic between
 * frontend and backend
 */
export * from "./sequelize";
export * as User from "./user";

/**
 * https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#operators
 */
export const Op: Op;

/**
 * Params query to sequelize find options
 */
export const findOptions: string;

export function createApiPath(baseURL: string): ModelApiPath;

export interface ModelApiPath {
  create: string;
  update: string;
  destroy: string;
  count: string;
  findAll: string;
  findAndCountAll: string;
}

/**
 * Types
 */
type Json = typeof import("./Op.json");
type Op = { [K in keyof Json]: unique symbol };