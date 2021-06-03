import path from "path";
import express from "express";
import { Pool } from "pg";
import createModel from "./pg";
import { handlerError } from "./error";

import { api } from "../src/service";

import type { Select, Update, Insert } from "../src/service";

const build = path.join(__dirname, "..", "build");

const route = `/${api}`;

export function router(pg: Pool) {
  const router = express.Router();

  const model = createModel(pg);

  router.use(express.static(build));

  router.delete(`${route}/:id/`, async (req, res) => {
    try {
      const id: number = req.params.id as any;

      await model.delete(id);

      res.json({ message: "success delete" });
    } catch (error) {
      const [code, message] = handlerError(error);

      res.status(code).json({ message });
    }
  });

  router.put(route, async (req, res) => {
    try {
      const person: Update = req.body;

      await model.update(person);

      res.json({ message: "success update" });
    } catch (error) {
      const [code, message] = handlerError(error);

      res.status(code).json({ message });
    }
  });

  router.post(route, async (req, res) => {
    try {
      const person: Insert = req.body;

      await model.insert(person);

      res.json({ message: "success insert" });
    } catch (error) {
      const [code, message] = handlerError(error);

      res.status(code).json({ message });
    }
  });

  router.get(route, async (req, res) => {
    try {
      const opt: Select = JSON.parse(req.query.query as any);

      const data = await model.select(opt);

      res.json(data);
    } catch (error) {
      const [code, message] = handlerError(error);

      res.status(code).json({ message });
    }
  });

  return router;
};
