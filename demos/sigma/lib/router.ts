import path from "path";
import { Pool } from "pg";
import express from "express";
import api from "./api";
import { route } from "./api/type";
import baseUrl from "./baseUrl";

const frontend = path.join(__dirname, "../frontend/build");

const index = path.join(frontend, "index.html");

export function createRouter(pool: Pool) {
  const router = express.Router();

  router.get(Object.values(route), (req, res) => res.sendFile(index));

  router.use(express.static(frontend));

  router.use(api(pool));

  return router;
}

export default function main(pool: Pool) {
  const route = baseUrl.replace(/\/$/, "");

  return express.Router().use(route, createRouter(pool));
}
