import express from "express";
import cors from "cors";
import logger from "morgan";
import path from "path";
import { Sequelize } from "sequelize";
import * as Minio from "minio";
import Storage from "../storage";
import { Database } from "../model";
import appRouter from "../router";
import setting from "../setting.json";
import { clearDataDemo, populateDemoData } from "../demo";

const isDev = process.env.NODE_ENV !== "production";
const port = parseInt(process.env.PORT ?? "5000");

const origin = isDev ? "http://localhost:3000" : undefined; // Dev React App
const reactApp = !isDev ? path.resolve(setting.frontendPath) : undefined;

/**
 * PostreSQL
 */
const seq = new Sequelize(env("DATABASE_URL"));

/**
 * Amazon S3
 */
const minio = new Minio.Client({
  endPoint: env("STORAGE_ENDPOINT"),
  accessKey: env("STORAGE_ACCESKEY"),
  secretKey: env("STORAGE_ACCESSECRET"),
  port: isDev ? 9000 : undefined,
  useSSL: !isDev,
});

(async function main() {
  /**
   * Database
   */
  await clearDataDemo(seq);

  const db = await Database.init(seq);

  await populateDemoData(db);

  /**
   * Storage
   */
  await Storage.Init(minio);

  /**
   * Http Server
   */
  const app = express();

  app.use(cors({ origin: origin }));

  app.use(express.json());

  app.use(logger("dev"));

  app.use(appRouter(reactApp));

  app.listen(port, () => console.log(`server on port ${port}`));
})().catch(console.error);

function env(key: keyof NodeJS.ProcessEnv) {
  const value = process.env[key];

  if (value) {
    return value;
  }

  throw new Error(`missing enviroment variable ${key}`);
}
