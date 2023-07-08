import * as sequelize from "sequelize";
import { Op } from "./Op";

const OpIntegration = Object.fromEntries(
  Object.entries(sequelize.Op).map(([key, symbl]) => [(Op as any)[key], symbl])
);

/**
 * https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#applying-where-clauses
 */
export function parseOperator(where: any): any {
  if (!where || !(typeof where === "object")) {
    return where;
  }

  if (Array.isArray(where)) {
    return where.map(parseOperator);
  }

  return Object.fromEntries(
    Object.entries(where).map(([key, val]) => {
      if (OpIntegration[key]) {
        return [OpIntegration[key], val];
      }

      return [key, parseOperator(val)];
    })
  );
}
