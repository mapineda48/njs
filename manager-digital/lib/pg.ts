import * as query from "./query";
import { Pool } from "pg";

import type { Record, Select, Insert, Update } from "../src/service";

export default function createDML(pg: Pool) {
  return {
    async delete(id: number) {
      await pg.query(query.dlete(id));
    },

    async update(data: Update) {
      await pg.query(query.update(data));
    },

    async insert(person: Insert) {
      await pg.query(query.insert(person));
    },

    async select(opt: Select) {
      const res = await pg.query(query.select(opt));

      return res.rows as Record[];
    },
  };
}
