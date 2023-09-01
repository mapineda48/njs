import Database from "../../../../model";
import AppError from "../../../../error/AppError";
import type {IRecord} from "../../../../integration/model/employee"

export default function findAll():IRecord[] {
  throw new AppError(400, "foo error");

  Database.employee.findAll()

  return "foo" as any;
}
