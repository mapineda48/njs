import path from "path";
import { Pool } from "pg";
import express from "express";
import sigma from "./redirect";
import createDML, { query } from "./model";
import * as msg from "./message";
import { api } from "../src/shared";

const build = path.join(__dirname, "..", "build");

function apiSigma() {
  const router = express.Router();

  router.get(`/${api.sigma}`, async (req, res, next) => {
    try {
      const json = await sigma();
      res.json(json);
    } catch (error) {
      next(error);
    }
  });

  return router;
}

function handlerError(error: any) {
  console.log(error);

  if (error.code === "ECONNREFUSED") {
    return msg.error.postgres;
  }

  switch (error.message) {
    case 'duplicate key value violates unique constraint "person_full_name_key"':
      return msg.error.fullName;
    case 'duplicate key value violates unique constraint "person_email_key"':
      return msg.error.email;
    default:
      return "";
  }
}

function apiPerson(pool: Pool) {
  const dml = createDML(pool);

  const router = express.Router();

  const person = `/${api.person}`;

  router.get(person, async (req, res, next) => {
    let data: query.Select = {};

    try {
      const opt: any = req.query.opt;

      if (!opt) {
        return res.status(400).json({ message: msg.error.select });
      }

      data = JSON.parse(opt);

      const rows = await dml.select(data);

      res.json(rows);
    } catch (error) {
      //console.log(data);
      const message = handlerError(error);

      if (message) return res.status(400).json({ message });

      res.status(500).json({ message: msg.error.unhandler });
    }
  });

  /**
   * Insert
   */
  router.post(person, async (req, res, next) => {
    try {
      const data = req.body;

      await dml.insert(data);

      res.json({ message: msg.succes.insert });
    } catch (error) {
      const message = handlerError(error);

      if (message) return res.status(400).json({ message });

      res.status(500).json({ message: msg.error.unhandler });
    }
  });

  /**
   * Update
   */
  router.put(person, async (req, res, next) => {
    try {
      const data = req.body;

      await dml.update(data);

      res.json({ message: msg.succes.update });
    } catch (error) {
      const message = handlerError(error);

      if (message) return res.status(400).json({ message });

      res.status(500).json({ message: msg.error.unhandler });
    }
  });

  /**
   * Delete
   */
  const dlete = path.join(person, ":id");

  router.delete(dlete, async (req, res, next) => {
    try {
      const target = req.params.id;

      const id = parseInt(target);

      if (isNaN(id)) {
        res.status(400).json({ message: msg.error.delete });
        return;
      }

      await dml.delete(id);

      res.json({ meesage: msg.succes.delete });
    } catch (error) {
      const message = handlerError(error);

      if (message) return res.status(400).json({ message });

      res.status(500).json({ message: msg.error.unhandler });
    }
  });

  return router;
}

function app() {
  const router = express();

  const routes = ["/", "/admin"];

  routes.forEach((route) => {
    router.use(route, express.static(build));
  });

  return router;
}

export = function create(pool: Pool) {
  const router = express();

  router.use(apiSigma());
  router.use(apiPerson(pool));
  router.use(app());

  return router;
};
