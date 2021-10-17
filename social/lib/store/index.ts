import webPush from "web-push";
import * as query from "./query";
import type { Pool } from "pg";
import type { VapidKeys, PushSubscription } from "web-push";

export default function createStore(pg: Pool) {
  return {
    async removeSubscription(sub: PushSubscription) {
      await pg.query(query.subscription.delete(sub));
    },

    async selectSubscriptions() {
      const { rows } = await pg.query(query.subscription.select);

      return rows.map((row) => row.data) as PushSubscription[];
    },

    async saveSubscription(sub: PushSubscription) {
      await pg.query(query.subscription.insert(sub));
    },

    async getVapidKeys(): Promise<VapidKeys> {
      const { rows } = await pg.query(query.vapidKeys.select);

      if (rows.length) {
        const [{ data }] = rows;

        return data;
      }

      const vapidKeys = webPush.generateVAPIDKeys();

      await pg.query(query.vapidKeys.insert(vapidKeys));

      return vapidKeys;
    },
  };
}

/**
 * Types
 */

export type Store = ReturnType<typeof createStore>;
