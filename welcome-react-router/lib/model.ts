import * as query from "./query";

import type { Pool } from "pg";
import type { Data } from "../src/shared";

export function createDML(pg: Pool) {
  return {
    async grettings(name = "") {
      const {
        rows: [data],
      } = await pg.query(query.grettings(name));

      return data as Data;
    },
  };
}
