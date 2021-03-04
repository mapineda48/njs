import * as query from "./query";
import { Pool } from "pg";

async function select(this: This, person: query.Select) {
  const dml = query.select(person);

  const { rows } = await this.pg.query(dml);

  return rows;
}

async function insert(this: This, person: query.Insert) {
  const dml = query.insert(person);

  await this.pg.query(dml);
}

async function update(this: This, person: query.Update) {
  const dml = query.update(person);

  await this.pg.query(dml);
}

async function dlete(this: This, id: number) {
  const dml = query.dlete(id);

  await this.pg.query(dml);
}

export default function createDML(pg: Pool) {
  return { pg, select, insert, update, delete: dlete };
}

export { query };

/**
 * Types
 */
type This = ReturnType<typeof createDML>;

export type DML = This;
