import Database from "..";
import documentsType from "./documentType.json";

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

  const [dni] = await Promise.all(
    documentsType.map((document) => Database.documentType.create(document))
  );

  const role = await Database.role.create({
    fullName: "SuperUser",
    isEnabled: false,
  });

  const user = await Database.user.create({
    fullName: "Miguel Pineda",
    email: "mapineda48@indiatimes.com",
    city: "Wafang",
    department: "Desa Werasari",
    birthday: new Date("1993-08-18T04:08:07Z"),
    documentNumber: versionKey,
    documentTypeId: dni.getDataValue("id"),
  });

  const employee = await Database.employee.create({
    userId: user.getDataValue("id"),
  });

  /**
   * Import change after sync
   */
  await Database.access.create({
    employeeId: employee.getDataValue("id"),
    username: "admin",
    password: "admin",
    isEnabled: true,
  });

  await Database.employeeRole.create({
    employeeId: employee.getDataValue("id"),
    roleId: role.getDataValue("id"),
  });

  const res = await Database.setting.create({
    key: versionKey,
    value: version,
  });

  return res.toJSON();
}
