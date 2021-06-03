import * as path from "path";
import * as express from "express";
import { createDML } from "./pg";

import type { Pool } from "pg";

const build = path.join(__dirname, "..", "build");

export function createRouter(pg: Pool) {
  const dml = createDML(pg);

  const router = express.Router();

  router.use(express.static(build));

  router.get("/api", async (req, res) => {
    try {
      const name: string = (req.query.name as any) || "";

      const data = await dml.grettings(name);

      res.json(data);
    } catch (error) {
      console.log(error);

      res.status(500).json({ meesage: "unhandler server error" });
    }
  });

  return router;
};
