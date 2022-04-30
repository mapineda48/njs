import guest from "./Guest";
import miguel from "./Miguel";
import subscription from "./Subscription";
import message from "./Message";
import { SCHEMA } from "./type";

import type { Sequelize } from "sequelize";

export default async function create(seq: Sequelize) {
  await seq.authenticate();

  await seq.createSchema(SCHEMA, {});

  const model = {
    seq,
    guest: guest(seq),
    miguel: miguel(seq),
    subscription: subscription(seq),
    message: message(seq),
  };

  await seq.sync();

  return model;
}

/**
 * https://sequelize.org/docs/v6/other-topics/typescript/
 */
export const UUIDV4: string = undefined as any;

/**
 * Types
 */

export type Model = ReturnType<typeof create> extends Promise<infer R>
  ? R
  : never;
