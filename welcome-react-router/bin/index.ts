import express from "express";
import logger from "morgan";
import { Pool } from "pg";
import redis from "redis";
import { createRouter } from "../lib";

const pgUri = process.env.DATABASE_URL;

if (!pgUri) {
  console.error("missgin postgres string connection.");
  process.exit(1);
}

const redisUri = process.env.CACHE_URL;

if (!pgUri) {
  console.error("missgin redis string connection.");
  process.exit(1);
}

const env = process.env.NODE_ENV || "unknown";

const port = parseInt(process.env.PORT || "3000");

const app = express();

const server = app.listen(port, () => {
  console.log(`server "${env}" listening port ${port}`);
});

const pg = new Pool({ connectionString: pgUri });

const rd = redis.createClient({ url: redisUri });

app.use(logger("dev"));

app.use(createRouter(pg, rd));
