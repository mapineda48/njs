import * as express from "express";
import { api as apiWeb } from "./type";
import { createSession } from "../jwt";
import { parseError } from "../error";
import { setChat, ServerIO } from "../socket";

const api = prepareApi(apiWeb);

export default function createApi(
  usename: string,
  password: string,
  io: ServerIO
) {
  const router = express.Router();

  const session = createSession(usename, password);

  setChat(io, session.isToken);

  router.post(api.login, async (req, res, next) => {
    try {
      const { username, password } = req.body;

      const token = await session(username, password);

      res.json({ token });
    } catch (error) {
      next(error);
    }
  });

  router.post(api.logout, async (req, res, next) => {
    try {
      const { token } = req.body;

      await session.logout(token);

      res.json({ message: "success" });
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
