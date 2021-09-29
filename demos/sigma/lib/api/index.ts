import express from "express";
import sigma from "../redirect";
import createDML from "../model";
import * as query from "../model/query";
import { getApi } from "./type";
import Error, { parse as parseErr } from "../error";

import type { Pool } from "pg";
import type { Success } from "./type";
import { Person, Record } from "../model/type";

const api = getApi();

export function createSigma() {
  const router = express.Router();

  router.get(api.sigma, async (req, res, next) => {
    try {
      const json = await sigma();
      res.json(json);
    } catch (error) {
      next(error);
    }
  });

  return router;
}

export function createCrudPerson(pool: Pool) {
  const router = express.Router();

  const dml = createDML(pool);

  router.get(api.person, async (req, res, next) => {
    let data: query.Select = {};

    try {
      const opt: any = req.query.q;

      if (!opt) {
        throw new Error(400, "missing query");
      }

      data = JSON.parse(opt);

      const rows = await dml.select(data);

      res.json(rows);
    } catch (error) {
      next(error);
    }
  });

  /**
   * Insert
   */
  router.post(api.person, async (req, res, next) => {
    try {
      const { person } = req.body as { person?: Person };

      if (!person) {
        throw new Error(404, "missing data");
      }

      await dml.insert(person);

      res.json({ message: `Registrado "${person.full_name}"` });
    } catch (error) {
      next(error);
    }
  });

  /**
   * Update
   */
  router.put(api.person, async (req, res, next) => {
    try {
      const { person } = req.body as { person: Record };

      if (!person) {
        throw new Error(404, "missing data");
      }

      await dml.update(person);

      res.json({ message: `${person.full_name} Actualizado` });
    } catch (error) {
      next(error);
    }
  });

  /**
   * Delete
   */

  router.delete(api.person + "/:id", async (req, res, next) => {
    try {
      const target = req.params.id;

      const id = parseInt(target);

      if (isNaN(id)) {
        new Error(400, "invalid id");
      }

      await dml.delete(id);

      res.json({ meesage: "Eliminado" });
    } catch (error) {
      next(error);
    }
  });

  const onErr: express.ErrorRequestHandler = (err, req, res, next) => {
    const [code, message] = parseErr(err);

    res.status(code).json({ message });
  };

  router.use(onErr);

  return router;
}

export default function createRoute(pool: Pool) {
  const router = express.Router();

  router.use(createSigma());

  router.use(createCrudPerson(pool));

  return router;
}
