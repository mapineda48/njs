import Database from "@models/index";
import initProductCategory from "../demo/initInventory";
import initSuperUser from "../demo/initSuperUser";

const versionKey = "version-agape-79ff5c96-947a-4983-a27e-1534afc5d28c";

export async function sync(version: string) {
  const setting = await Database.setting.findOne({
    where: { key: versionKey },
  });
  const current = setting?.getDataValue("value") as string;

  if (current === version) {
    return;
  }

  if (current) {
    throw new Error("agape fail sync boot data");
  }

  await initSuperUser();
  await initProductCategory();

  const res = await Database.setting.create({
    key: versionKey,
    value: version,
  });

  return res.toJSON();
}
