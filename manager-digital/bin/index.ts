import express from "express";
import logger from "morgan";
import { Pool } from "pg";
import { router as demo } from "../lib";

const { port, env, pgUri } = parseEnv();

const app = express();

const pg = new Pool({
  connectionString: pgUri,
});

const server = app.listen(port, () => {
  console.log(`server "${env}" listening port ${port}`);
});

app.use(logger("dev"));

app.use(express.json());

app.use("/", demo(pg));

function parseEnv() {
  const port = parseInt(process.env.PORT);

  if (isNaN(port)) {
    console.error(`invalid port "${port}"`);
    process.exit(1);
  }

  const pgUri = process.env.DATABASE_URL;

  if (!pgUri) {
    console.error(`missing string postgres uri connection`);
    process.exit(1);
  }

  const env = process.env.NODE_ENV || "unknown";

  return { port, pgUri, env };
}
