import { schema } from "./type";
import definePerson from "./person";

import type { Sequelize } from "sequelize";

export default async function create(seq: Sequelize) {
  await seq.authenticate();

  await seq.createSchema(schema, {});

  const model = {
    person: definePerson(seq),
  };

  await seq.sync();

  return model;
}
