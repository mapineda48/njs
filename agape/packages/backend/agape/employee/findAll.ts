import { Database } from "../../model";
import AppError from "../../error/AppError";

export default function findAll() {
  throw new AppError(400, "foo error");

  return Database.connection.employee.findAll();
}
