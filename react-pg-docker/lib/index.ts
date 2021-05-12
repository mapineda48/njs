import path from "path";
import express from "express";
import { Pool } from "pg";
import createModel from "./pg";
import { handlerError } from "./error";

import { api } from "../src/service";

const build = path.join(__dirname, "..", "build");

export = function create(pg: Pool) {
  const router = express.Router();

  const model = createModel(pg);

  router.use(express.static(build));

  router.get(`/${api}`, async (req, res) => {
    try {
      const [data] = await model.greet();

      res.json(data);
    } catch (error) {
      const [code, message] = handlerError(error);

      res.status(code).json({ message });
    }
  });

  return router;
};
