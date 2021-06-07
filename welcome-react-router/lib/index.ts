import express from "express";
import { build } from "./paths";
import * as ssr from "./ssr";
import { createCache } from "./cache";
import { createDML } from "./model";
import { route, api } from "../src/shared";

import type { RedisClient } from "redis";
import type { Pool } from "pg";

const routeStatic = [route.about];

routeStatic.push(route.users);

export function createRouter(pg: Pool, redis: RedisClient, baseUrl = "/") {
  const router = express.Router();

  const cache = createCache(redis);

  const db = createDML(pg);

  ssr.loadHTML(baseUrl);

  router.get("/" + api.id, async (req, res) => {
    try {
      const id = req.params.id;

      const message = await cache.get(id);

      res.json({ message });
    } catch (error) {
      res.status(500).json({ message: "unhadler error" });
    }
  });

  router.get(route.root, async (req, res) => {
    try {
      const val = req.query.name;

      if (!val) {
        const html = ssr.render(req.url);

        return res.send(html);
      }

      const name = val.toString();

      const { message } = await db.grettings(name);

      const id = await cache.set(message);

      const html = ssr.render(req.url, { message, id });

      res.send(html);
    } catch (error) {
      console.log(error);
      res.status(500).send("Unhandler server error");
    }
  });

  routeStatic.forEach((route) => {
    router.get(route, (req, res) => {
      const html = ssr.render(req.url);

      res.send(html);
    });
  });

  router.use(express.static(build));

  router.use("*", (req, res) => res.status(404).send("not found!!!"));

  return router;
}
