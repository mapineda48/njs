import path from "path";
import express from "express";
import api from "./api";
import { route } from "./api/type";
import baseUrl from "./baseUrl";

import type { Sequelize } from "sequelize";

const frontend = path.join(__dirname, "../frontend/build");

const index = path.join(frontend, "index.html");

export function createRouter(seq: Sequelize) {
  const router = express.Router();

  router.get(Object.values(route), (req, res) => res.sendFile(index));

  router.use(express.static(frontend));

  router.use(api(seq));

  return router;
}

export default function main(seq: Sequelize) {
  const route = baseUrl.replace(/\/$/, "");

  return express.Router().use(route, createRouter(seq));
}
