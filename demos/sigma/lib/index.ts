import path from "path";
import { Pool } from "pg";
import express from "express";
import api from "./api";
import route from "./baseUrl";

const frontend = path.join(__dirname, "../view/build");

export function createRouter(pool: Pool) {
  const router = express.Router();

  const home = path.join(route, "crud");

  router.get("/", (req, res) => {
    res.redirect(home);
  });

  router.use(express.static(frontend));

  router.use(api(pool));

  return router;
}

export default function main(pool: Pool) {
  return express.Router().use(route, createRouter(pool));
}
