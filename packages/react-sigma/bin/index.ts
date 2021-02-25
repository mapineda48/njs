import express from "express";
import logger from "morgan";
import { Server as Socket } from "socket.io";
import { Pool } from "pg";
import router from "../router";

const { port, pgURI, env } = getFromEnv();

const app = express();

const http = app.listen(port, () => {
  console.log(`server "${env}" listening port "${port}"`);
});

const socket = new Socket(http);

const pg = new Pool({
  connectionString: pgURI,
});

app.use(express.json());

app.use(logger("dev"));

app.use(router(pg));

function getFromEnv() {
  const env = process.env.NODE_ENV || "unknown";

  const port = parseInt(process.env.PORT || "3000");

  const pgURI = process.env.DATABASE_URL;

  if (!port || isNaN(port)) printWarning("invalid port");

  if (!pgURI) printWarning("missing postgres string connection");

  return { env, port, pgURI };
}

function printWarning(message: string) {
  console.warn(message);
  process.exit(1);
}
