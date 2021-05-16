import * as query from "./query";
import { Pool } from "pg";

import type { DataGreet } from "../src/service";

export default function createDML(pg: Pool) {
  return {
    async greet() {
      const res = await pg.query(query.greet());

      return res.rows as DataGreet[];
    },
  };
}
