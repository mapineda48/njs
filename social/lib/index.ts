import * as express from "express";
import { api as apiWeb } from "../src/http/type";
import { createSession } from "./jwt";
import { parseError } from "./error";
import { setChat, ServerIO } from "./socket";

const api = prepareApi(apiWeb);

console.log(api);

export function createApi(usename: string, password: string, io: ServerIO) {
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

export function prepareApi<T>(api: T): T {
  const res: any = Object.fromEntries(
    Object.entries(apiWeb).map(([key, val]) => [key, "/miguel/" + val])
  );

  return res;
}

/**
 * Types
 */
type Api = typeof apiWeb;