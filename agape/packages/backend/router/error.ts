import { tryParseError } from "../error";

import type { UpdateOptions } from "sequelize";
import type { ErrorRequestHandler, NextFunction, Request, Response } from "express";

export const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  const [code, message] = tryParseError(err);

  res.status(code).json({ message });
};



/**
 * Types
 */

export type Next = NextFunction;

export type Res = Response;

export type ReqPut<T> = Request<unknown, unknown, T, UpdateOptions>;

export type Req = Request;
