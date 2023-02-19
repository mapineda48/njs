import express from "express";
import cors from "cors";
import logger from "morgan";
import path from "path";
import { Sequelize } from "sequelize";
import { Database } from "../model";
import appRouter from "../router";
import setting from "../setting.json";
import { clearDataDemo, populateDemoData } from "../demo";

/**
 * Enviroment
 */
const isDevelopment = !setting.production;

const origin = isDevelopment ? "http://localhost:3000" : undefined;

const reactApp = !isDevelopment
  ? path.resolve(setting.frontendPath)
  : undefined;

/**
 * Database Connection
 */
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error("missing database URI connection");
  process.exit(1);
}

const seq = new Sequelize(databaseUrl);

clearDataDemo(seq)
  .then((seq) => Database.init(seq))
  .then((db) => populateDemoData(db))
  .catch((error) => console.error(error));

/**
 * Http Server
 */
const port = parseInt(process.env.PORT ?? "5000");

const app = express();

app.use(cors({ origin }));

app.use(express.json());

app.use(logger("dev"));

app.use(appRouter(reactApp));

app.listen(port, () => console.log(`server on port ${port}`));
