import * as express from "express";
import * as logger from "morgan";
import { Pool } from "pg";
import { createRouter } from "../lib";

const pgUri = process.env.DATABASE_URL;

if (!pgUri) {
  console.error("missgin postgres string connection.");
  process.exit(1);
}

const env = process.env.NODE_ENV || "unknown";

const port = parseInt(process.env.PORT || "3000");

const app = express();

const server = app.listen(port, () => {
  console.log(`server "${env}" listening port ${port}`);
});

const pg = new Pool({ connectionString: pgUri });

app.use(logger("dev"));

app.use(createRouter(pg));
