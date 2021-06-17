import * as path from "path";
import * as express from "express";

export const build = path.join(__dirname, "..", "build");

export function createRouter() {
  const router = express.Router();

  router.use(express.static(build));

  return router;
}
