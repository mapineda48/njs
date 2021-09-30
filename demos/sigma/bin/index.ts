import express from "express";
import logger from "morgan";
import { Pool } from "pg";
import sigma from "../lib";
import route from "../lib/route";

const { port, env, pgUri } = parseEnv();

const pg = new Pool({
  connectionString: pgUri,
});

const app = express();

const server = app.listen(port, () => {
  console.log(`server "${env}" listening port ${port}`);
});

app.use(express.json());

app.use(logger("dev"));

app.get("/", (req, res) => res.redirect(route));

app.use(sigma(pg));

function parseEnv() {
  const port = parseInt(process.env.PORT || "3000");

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
