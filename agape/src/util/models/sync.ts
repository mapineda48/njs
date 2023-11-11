import { waitAuthenticate } from ".";
import Database, { schema, sequelize } from "../../models";
import initProductCategory from "./demo/initInventory";
import initSuperUser from "./demo/initSuperUser";
import { existsSchema } from "./schema";

const versionKey = "version-agape-79ff5c96-947a-4983-a27e-1534afc5d28c";

export async function sync(isDev: boolean, version: string) {
  if (isDev) {
    await sequelize.authenticate();
    await sequelize.dropSchema(schema, {});
  } else {
    await waitAuthenticate(sequelize);
  }

  if (!(await existsSchema(sequelize, schema))) {
    await sequelize.createSchema(schema, {});
    await sequelize.sync();
    await demo(version);

    return;
  }

  const setting = await Database.setting.findOne({
    where: { key: versionKey },
  });

  const current = setting?.getDataValue("value") as string;

  if (current === version) {
    return;
  }

  if (current) {
    throw new Error("agape fail sync models");
  }
}

export async function demo(version: string) {
  await initSuperUser();
  await initProductCategory();

  const res = await Database.setting.create({
    key: versionKey,
    value: version,
  });

  return res.toJSON();
}
