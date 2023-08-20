import Database from "../../model";
import Unauthorized from "../../error/Unauthorized";
import { tryParseError } from "../../error";
import { AgapeHeader } from "../../integration";

export async function verify(app: string, username: string, password: string) {
  if (!username || !password || app !== AgapeHeader) {
    throw new Unauthorized();
  }

  let employeeId = 0;

  try {
    const access = await Database.access.findOne({
      where: { username, password, isEnabled: true },
    });

    employeeId = access?.getDataValue("employeeId") ?? employeeId;
  } catch (error) {
    console.log(tryParseError(error));
  }

  if (!employeeId) {
    throw new Unauthorized();
  }

  const employee = await Database.employee.findOne({
    where: { id: employeeId },
  });

  if (!employee) {
    throw new Unauthorized();
  }

  return employee.toJSON();
}
