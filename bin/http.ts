import http from "http";
import express from "express";
import { Server as Socket } from "socket.io";
//import redis from "redis";
import { Pool } from "pg";
import { Sequelize } from "sequelize";
import personalRouter from "../lib";

const isDev = process.env.NODE_ENV !== "production";

// const redisClient = redis.createClient({
//   host: getFromEnv("REDIS_HOSTNAME"),
//   password: getFromEnv("REDIS_PASSWORD"),
//   port: parseInt(getFromEnv("REDIS_PORT")),
// });

const pg = new Pool({
  connectionString: getFromEnv("DATABASE_URL"),
  ssl: isDev
    ? false
    : /**
       * https://stackoverflow.com/questions/61097695/self-signed-certificate-error-during-query-the-heroku-hosted-postgres-database
       */
      { rejectUnauthorized: false },
});

const seq = new Sequelize(getFromEnv("DATABASE_URL"), {
  dialect: "postgres",
  dialectOptions: {
    ssl: { rejectUnauthorized: false },
  },
});

const port = parseInt(getFromEnv("PORT"));

const app = express();
const server = http.createServer(app);
const io = new Socket(server);

server.listen(port, () => console.log(`Server on port ${port}`));

app.use(
  personalRouter({
    io,
    pg,
    seq,
    username: getFromEnv("PERSONAL_USERNAME"),
    password: getFromEnv("PERSONAL_PASSWORD"),
    host: getFromEnv("HOST"),
  })
);

/**
 * Try to get variable from enviroment
 */
export function getFromEnv(key: string): string {
  const val: any = process.env[key];

  if (!val) {
    throw new Error(`Missing env variable ${key}`);
  }

  return val;
}
