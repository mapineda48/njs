import path from "path";
import express from "express";

const build = path.join(__dirname, "..", "build");

export = function create() {
  const router = express.Router();

  router.use(express.static(build));

  return router;
}
