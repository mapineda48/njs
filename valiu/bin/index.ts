import { createServer } from "http";
import express from "express";
import logger from "morgan";
import { Pool } from "pg";
import { Server as Socket } from "socket.io";
import { createRouter as router } from "../lib";

// eslint-disable-next-line @typescript-eslint/no-use-before-define
const { port, pgURI, env } = getFromEnv();

const app = express();

const http = createServer(app);

const socket = new Socket(http);

const pg = new Pool({
  connectionString: pgURI,
});

app.use(express.json());

app.use(logger("dev"));

app.use(router(pg, socket));

http.listen(port, () => {
  console.log(`${env} listening on port ${port}`);
});

function getFromEnv() {
  const env = process.env.NODE_ENV || "unknown";

  const port = parseInt(process.env.PORT || "0");

  const pgURI = process.env.DATABASE_URL;

  if (!port || isNaN(port)) {
    console.error("invalid port");
    process.exit(1);
  }

  if (!pgURI) {
    console.error("missing postgres string connection");
    process.exit(1);
  }

  return { env, port, pgURI };
}
