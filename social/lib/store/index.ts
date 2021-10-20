import type { Pool } from "pg";
import type { PushSubscription } from "web-push";

export default class Store {
  public subscription: CRUDSubscription;
  public map: CRUDMap;

  constructor(private pg: Pool) {
    this.subscription = new CRUDSubscription(this.pg);
    this.map = new CRUDMap(this.pg);
  }
}

export class CRUDMap {
  async delete(key: string) {
    const query = `DELETE FROM "social"."document" WHERE "id" = $1::TEXT`;

    return this.pg.query(query, [key]);
  }

  async set(key: string, value: any) {
    const query = `INSERT INTO "social"."document"("id","data") VALUES ($1::TEXT, $2::jsonb) ON CONFLICT (id) DO UPDATE SET "data" = $2::jsonb`;

    await this.pg.query(query, [key, JSON.stringify(value)]);
  }

  async get<T = any>(key: string): Promise<T | null> {
    const query = `SELECT "data" FROM "social"."document" WHERE "id" = $1::TEXT`;

    const { rows } = await this.pg.query(query, [key]);

    if (!rows.length) {
      return null;
    }

    const [{ data }] = rows;

    return data;
  }

  constructor(private pg: Pool) {}
}

export class CRUDSubscription {
  async delete(subscription: PushSubscription) {
    const query = `DELETE FROM "social"."document" WHERE "id" = 'sub_' || $1::TEXT`;

    return this.pg.query(query, [subscription.endpoint]);
  }

  async insert(subscription: PushSubscription) {
    const query = `INSERT INTO "social"."document"("id","data") VALUES ('sub_' || $1::TEXT, $2::jsonb)`;

    return this.pg.query(query, [
      subscription.endpoint,
      JSON.stringify(subscription),
    ]);
  }

  async select() {
    const query = `SELECT "data" FROM "social"."document" WHERE "id"~ 'sub_'`;

    const { rows } = await this.pg.query(query);

    return rows.map(({ data }) => data) as PushSubscription[];
  }

  constructor(private pg: Pool) {}
}

/**
 * Types
 */

export type { Store };
