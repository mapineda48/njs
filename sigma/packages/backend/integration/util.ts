/* eslint-disable @typescript-eslint/no-explicit-any */
import * as frontend from ".";
import { Op } from "sequelize";

export function parseQuery(query: any): any {
  if (!query[frontend.findOptions]) {
    return query;
  }

  const { where, limit, offset, order } = JSON.parse(
    query[frontend.findOptions]
  );

  const findOptions = { where, limit, offset, order };

  if (where) {
    findOptions.where = parseWhere(where);
  }

  return findOptions;
}

const pipe = Object.fromEntries(
  Object.entries(Op).map(([key, symbl]) => [(frontend as any).Op[key], symbl])
);

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
      if (pipe[key]) {
        return [pipe[key], val];
      }

      return [key, parseWhere(val)];
    })
  );
}
