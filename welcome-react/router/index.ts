import path from "path";
import express from "express";
import { message } from "../src/shared";

const build = path.join(__dirname, "..", "build");

export = function create() {
  const router = express.Router();

  router.use(express.static(build));

  router.get("/api", (req, res) => {
    res.json({ message });
  });

  return router;
};
