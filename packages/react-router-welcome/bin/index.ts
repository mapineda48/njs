import { createServer } from "http";
import express from "express";
import logger from "morgan";
import router from "../router";

const { port, env } = getFromEnv();

const app = express();

const http = createServer(app);

app.use(express.json());

app.use(logger("dev"));

app.use("/foo", router("/foo"));

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

  return { env, port, pgURI };
}
