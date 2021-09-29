import path from "path";
import { Pool } from "pg";
import express from "express";
import api from "./api";

const build = path.join(__dirname, "../view/build");

export default function createRouter(pool: Pool) {
  const router = express();

  router.use(express.static(build));

  router.use(api(pool));

  return router;
}
