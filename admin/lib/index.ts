import * as path from "path";
import * as express from "express";
import { createSession } from "./jwt";
import { parseError } from "./error";
import { api as apiSrc } from "../src/service";
import { route } from "../src/route";
import * as util from "./util";
export { TOKEN as KEY_TOKEN_BROWSER } from "../src/App/state/storage/key";

import type {
  ReqLogIn,
  ResLogIn,
  ReqIsToken,
  ResIsToken,
} from "../src/service";

/**
 * Build React App
 */
const build = path.join(__dirname, "..", "build");

const index = path.join(build, "index.html");

const api = util.prepareApi(apiSrc);

export function createaAdmin(opt: Options) {
  const { user, password } = opt;

  const router = express.Router();

  const session = createSession(user, password);

  /**
   * Api
   */
  router.delete(api.login, (req, res, next) => {
    try {
      session.end();
      res.json({ message: "sucess" });
    } catch (error) {
      next(error);
    }
  });

  router.post(api.login, async (req, res, next) => {
    try {
      const { user, password } = req.body as Partial<ReqLogIn>;

      const token = await session(user, password);

      const resData: ResLogIn = { token };

      res.json(resData);
    } catch (error) {
      next(error);
    }
  });

  router.post(api.isToken, async (req, res, next) => {
    try {
      const data: ReqIsToken = req.body;

      const isToken = await session.isToken(data.token);

      const resData: ResIsToken = { isToken };

      res.json(resData);
    } catch (error) {
      next(error);
    }
  });

  /**
   * Build View
   */
  router.use(express.static(build));

  Object.values(route).forEach((route) =>
    router.get(route, (req, res) => res.sendFile(index))
  );

  /**
   * Handler Errors
   * https://expressjs.com/en/guide/error-handling.html
   */
  router.use(((err, req, res, next) => {
    const { code, data } = parseError(err);

    res.status(code).json(data);
  }) as express.ErrorRequestHandler);

  return router;
}

export function createRouter(opt: Options) {
  const router = express.Router();

  router.use("/admin", createaAdmin(opt));

  return router;
}

/**
 * Types
 */
interface Options {
  user: string;
  password: string;
}
