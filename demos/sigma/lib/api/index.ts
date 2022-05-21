import express from "express";
import sigma from "../redirect";
import createModel from "../models";
import { getApi } from "./type";
import Error, { parse as parseErr } from "../error";

import type { Router } from "express";
import type { Sequelize } from "sequelize";
import type { Person, Record } from "../models/person";

const api = getApi();

export async function addCrudPerson(router: Router, seq: Sequelize) {
  const model = await createModel(seq);

  router.get(api.person, async (req, res, next) => {
    try {
      const data: any = req.query.q;

      if (!data) {
        throw new Error(400, "missing query");
      }

      const opt = JSON.parse(data);

      const rows = await model.person.findAll(opt);

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
      const person = req.body as Person;

      if (!person) {
        throw new Error(404, "missing data");
      }

      const record = await model.person.create(person);

      res.json(record);
    } catch (error) {
      next(error);
    }
  });

  /**
   * Update
   */
  router.put(api.person, async (req, res, next) => {
    try {
      const data = req.body as Record;

      if (!data) {
        throw new Error(404, "missing data");
      }

      const record = await model.person.findOne({
        where: {
          id: data.id,
        },
      });

      if (!record) {
        res.status(404).json({ message: "not found" });

        return;
      }

      record.update(data);

      res.json(record);
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

      await model.person.destroy({
        where: {
          id,
        },
      });

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
}

export default function create(seq: Sequelize) {
  const router = express.Router();

  addCrudPerson(router, seq).then((err) => {
    throw err;
  });

  /**
   * Sigma API
   */
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
