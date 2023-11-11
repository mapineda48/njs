import { QueryTypes, Sequelize } from "sequelize";

export async function existsSchema(seq: Sequelize, schema: string) {
  const query = `SELECT schema_name FROM information_schema.schemata WHERE schema_name = '${schema}';`;

  const res = await seq.query(query, { type: QueryTypes.SELECT });

  console.log(res);

  return Boolean(res.length);
}
