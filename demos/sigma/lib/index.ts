import path from "path";
import { Pool } from "pg";
import express from "express";
import api from "./api";
import route from "./route";

const frontend = path.join(__dirname, "../view/build");

export function createRouter(pool: Pool) {
  const router = express.Router();

  router.get("/", (req, res) => res.redirect("./crud/"));

  router.use(express.static(frontend));

  router.use(api(pool));

  return router;
}

export default function main(pool: Pool) {
  return express.Router().use(route, createRouter(pool));
}
