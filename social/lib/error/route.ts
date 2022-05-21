import { logError } from "./log";
import { ErrorRoute } from "./Error";
import type { ErrorRequestHandler } from "express";
/**
 * Handler Errors
 * https://expressjs.com/en/guide/error-handling.html
 */
export const onError: ErrorRequestHandler = (err, req, res, next) => {
  logError(err);

  const { code, message } = ErrorRoute.parse(err);

  res.status(code).json(message);
};
