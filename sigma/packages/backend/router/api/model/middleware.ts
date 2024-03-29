import { parseQuery } from "../../../integration/util";
import { parseErrorModel } from "./error";

import type { UpdateOptions } from "sequelize";
import type { ErrorRequestHandler, NextFunction, Request, Response } from "express";

export function parseQueryMiddleware(req: Req, res: Res, next: Next) {
  if (req.method === "POST") {
    return next();
  }

  const query = parseQuery(req.query);

  if (req.method === "PUT") {
    query.returning = true;
  }

  req.query = query;

  next();
}

export const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  const [code, message] = parseErrorModel(err);

  res.status(code).json({ message });
};

/**
 * Types
 */

export type Next = NextFunction;

export type Res = Response;

export type ReqPut<T> = Request<unknown, unknown, T, UpdateOptions>;

export type Req = Request;
