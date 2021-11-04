import definePerson from "./Person";

import type { Sequelize } from "sequelize";

export default async function create(opt: Options) {
  const { sequelize, schema } = opt;

  await sequelize.dropSchema(schema, {});

  await sequelize.createSchema(schema, {});

  const model = {
    person: definePerson(opt),
  };

  await sequelize.sync();

  return model;
}

/**
 * Types
 */
export type Model<T = ReturnType<typeof create>> = T extends Promise<infer R>
  ? R
  : never;

export interface Options {
  sequelize: Sequelize;
  schema: string;
}
