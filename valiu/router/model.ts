import query from "./query";
import { Pool } from "pg";

export default function create(pg: Pool) {
  return {
    async select() {
      const current = query.select();

      const res = await pg.query(current);

      const { rows } = res;

      return rows;
    },

    async insert(tag: any) {
      const current = query.insert(tag);

      const res = await pg.query(current);

      const { rows } = res;

      return rows[0];
    },

    async update(tag: any) {
      const current = query.update(tag);

      const res = await pg.query(current);

      const { rows } = res;

      return rows[0];
    },

    async delete(id: number) {
      const current = query.delete(id);

      const res = await pg.query(current);

      const { rows } = res;

      return rows[0];
    },
  };
}
