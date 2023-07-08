import { ValidationErrorItem } from "sequelize";
import AppError from "./AppError";

export function tryParseError(val: unknown): [number, string] {
  const validationError = logSequelizeError(val);

  if (validationError) {
    return [400, validationError];
  }

  if (val instanceof AppError) {
    return [val.code, val.message];
  }

  logUnkownError(val);

  return [500, "unhandler error"];
}

function logSequelizeError(error: unknown): string {
  if (!(error instanceof Object)) {
    return "";
  }

  if (!("errors" in error) || !Array.isArray(error.errors)) {
    return "";
  }

  const validationErrorItems: ValidationErrorItem[] = error.errors.filter(
    (error) => error instanceof ValidationErrorItem
  );

  if (!validationErrorItems.length) {
    return "";
  }

  return validationErrorItems.map((error) => error.message).join(", ");
}

function logUnkownError(val: unknown) {
  console.log("------------------Unknown error-------------------------");
  console.error(val);
  console.log("-------------------------------------------------------");
}

/**
 * Types
 */
interface ErrorInterface<T extends Error = Error> {
  new (name: string): T;
}
