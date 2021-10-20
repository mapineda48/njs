import * as express from "express";
import { api as apiWeb } from "./type";
import { parseError } from "../error";

import type { Auth } from "../auth";

const api = prepareApi(apiWeb);

export default function createApi(auth: Auth) {
  const router = express.Router();

  router.post(api.login, async (req, res, next) => {
    try {
      const { username, password } = req.body;

      const token = await auth.login(username, password);

      res.json({ token });
    } catch (error) {
      next(error);
    }
  });

  /**
   * Handler Errors
   * https://expressjs.com/en/guide/error-handling.html
   */
  const onError: express.ErrorRequestHandler = (err, req, res, next) => {
    const { code, data } = parseError(err);

    res.status(code).json(data);
  };

  router.use(onError);

  return router;
}

export function prepareApi<T>(api: T): T;
export function prepareApi(api: any): any {
  return Object.fromEntries(
    Object.entries(api).map(([key, val]) => [key, "/miguel/" + val])
  );
}

/**
 * Types
 */
