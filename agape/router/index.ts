import * as express from "express";
import { Pool } from "pg";
import * as path from "path";
import createDML from "./model";
import jwt from "./token";

const build = path.join(__dirname, "..", "build");

function app() {
  const router = express.Router();

  router.use(express.static(build));

  return router;
}

function handlerError(
  res: express.Response,
  next: express.NextFunction,
  error: any
) {
  console.log(error);

  if (error.code === "ECONNREFUSED") {
    return res.status(403).json({ message: "temporary out service" });
  }

  res.status(500).json({ message: "Server Error" });
}

function api(pool: Pool) {
  const router = express.Router();

  const api = "/api";

  const agape = createDML(pool);

  const login = path.join(api, "login");

  router.post(login, async (req, res, next) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res
          .status(400)
          .json({ message: "missing username y/o password" });
      }

      const employee = await agape.login(username, password);

      if (!employee) {
        return res
          .status(400)
          .json({ message: "invalid username y/o password" });
      }

      const token = await jwt.sign(employee);

      res.json({ employee, token });
    } catch (error) {
      handlerError(res, next, error);
    }
  });

  const db = path.join(api, "db");

  const regApi = new RegExp(db);

  router.use(regApi, async (req, res, next) => {
    const token = req.headers["access-token"] as string;

    if (!token) {
      return res.status(403).json({ message: "missing token" });
    }

    try {
      await jwt.verify(token);
    } catch (error) {
      console.log(error);
      return res.status(403).json({ message: "invalid token" });
    }

    next();
  });

  agape.tables.forEach((table) => {
    const current = path.join(db, table);

    /**
     * Select - Get
     */
    router.get(current, async (req, res, next) => {
      const { opt } = req.query;

      if (!opt) {
        return res.send(403).json({ message: `missing ${table} options` });
      }

      try {
        const result = await agape.select(table, JSON.parse(opt as any));

        res.json(result);
      } catch (error) {
        next(error);
      }
    });

    /**
     * Insert -Post
     */
    router.post(current, async (req, res, next) => {
      const { body } = req;

      try {
        const result = await agape.insert(table, body);

        res.json(result);
      } catch (error) {
        next(error);
      }
    });

    /**
     * Update - Put
     */
    router.put(current, async (req, res, next) => {
      const { id, input } = req.body;

      try {
        const result = await agape.update(table, id, input);

        if (!result) {
          return res.status(403).json({ message: "invalid id" });
        }

        res.json(result);
      } catch (error) {
        next(error);
      }
    });

    /**
     * Delete - delete
     */
    router.delete(current, async (req, res, next) => {
      const { id } = req.query;

      if (!id) {
        res.status(403).json({ message: "missing id" });
      }

      try {
        const result = await agape.delete(table, id as any);

        res.json(result);
      } catch (error) {
        next(error);
      }
    });
  });

  return router;
}

function create(pool: Pool) {
  const router = express.Router();

  router.use(app());

  router.use(api(pool));

  return router;
}

export = create;
