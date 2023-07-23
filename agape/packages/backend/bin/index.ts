import express from "express";
import cors from "cors";
import logger from "morgan";
import path from "path";
import { Sequelize } from "sequelize";
import cls from "cls-hooked";
import * as Minio from "minio";
import Storage from "../storage";
import Database from "../model";
import appRouter from "../router";
import setting from "../setting.json";
import { clearDataDemo, populateDemoData } from "../model/util/demo";

const isDev = process.env.NODE_ENV !== "production";
const port = parseInt(process.env.PORT ?? "5000");

const origin = isDev ? "http://localhost:3000" : undefined; // Dev React App
const reactApp = !isDev ? path.resolve(setting.frontendPath) : undefined;

/**
 * PostreSQL
 */
const seq = new Sequelize(env("DATABASE_URL"));

// https://sequelize.org/docs/v6/other-topics/transactions/#automatically-pass-transactions-to-all-queries
const namespace = cls.createNamespace("agape");
Sequelize.useCLS(namespace);

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
  //await clearDataDemo(seq);

  await Database.init(seq);

  //await populateDemoData();

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

export function env(key: keyof NodeJS.ProcessEnv) {
  const value = process.env[key];

  if (value) {
    return value;
  }

  throw new Error(`missing enviroment variable ${key}`);
}
