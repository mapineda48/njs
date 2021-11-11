import { schema } from "./type";
import defSubscription from "./Subscription";
import defVapidDetails from "./VapidDetails";

import type { Sequelize } from "sequelize";

export default async function create(seq: Sequelize) {
  await seq.authenticate();

  await seq.createSchema(schema, {});

  const model = {
    subscription: defSubscription(seq),
    vapidDetails: defVapidDetails(seq),
  };

  await seq.sync();

  return model;
}

/**
 * Types
 */

export type Model<T = ReturnType<typeof create>> = T extends Promise<infer R>
  ? R
  : never;
