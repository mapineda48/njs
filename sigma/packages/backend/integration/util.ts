/* eslint-disable @typescript-eslint/no-explicit-any */
import * as frontend from ".";
import { Op } from "sequelize";

export function parseQuery(query: any): any {
  if (!query[frontend.findOptions]) {
    return query;
  }

  const search = JSON.parse(query[frontend.findOptions]);

  return parseOptions(search);
}

const OpIntegration = Object.fromEntries(
  Object.entries(Op).map(([key, symbl]) => [(frontend as any).Op[key], symbl])
);

export function parseOptions(search: any): any {
  if (!search) {
    return;
  }

  const { where, limit, offset, order } = search;

  const findOptions = { where, limit, offset, order };

  if (where) {
    findOptions.where = parseWhere(where);
  }

  return findOptions;
}

/**
 * https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#applying-where-clauses
 */
export function parseWhere(where: any): any {
  if (!where || !(typeof where === "object")) {
    return where;
  }

  if (Array.isArray(where)) {
    return where.map(parseWhere);
  }

  return Object.fromEntries(
    Object.entries(where).map(([key, val]) => {
      if (OpIntegration[key]) {
        return [OpIntegration[key], val];
      }

      return [key, parseWhere(val)];
    })
  );
}
