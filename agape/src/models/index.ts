import { Sequelize, Transaction } from "sequelize";
import cls from "cls-hooked";
import * as setting from "./setting";
import * as user from "./user";
import * as employee from "./employee";
import * as documentType from "./documentType";
import * as inventory from "./inventory";
import { defineGet } from "../util/models";
import { toMap } from "../util/models/toMap";
import { env } from "../util/env";

/**
 * Database
 */
export interface Database {
  readonly setting: setting.IModelStatic;
  readonly documentType: documentType.IModelStatic;
  readonly user: user.IModelStatic;
  readonly employee: employee.IModelStatic;
  readonly inventory: inventory.IModelStatic;

  readonly transaction: <T>(autoCallback: AutoCallBack<T>) => Promise<T>;
  readonly withTransaction: <T extends CallBack>(cb: T) => T;
}

/**
 * Singleton Database
 */
const db: unknown = {};

export default db as Database;

/**
 * Initialize and define models
 */
export const schema = "agape";
export const sequelize = new Sequelize(env("DATABASE_URL"), { schema });

// https://sequelize.org/docs/v6/other-topics/transactions/#automatically-pass-transactions-to-all-queries
const namespace = cls.createNamespace("agape");
Sequelize.useCLS(namespace);

/**
 * Define models
 */
const models = [setting, documentType, user, employee, inventory];
models.forEach((model) => model.define(sequelize));

/**
 * Add models to singleton
 */
Object.entries(toMap(sequelize.models)).forEach(([key, model]) => {
  defineGet(db, key, model);
});

/**
 * transaction
 */
defineGet(db, "transaction", (cb: AutoCallBack<unknown>) =>
  sequelize.transaction(cb)
);

/**
 * withTransaction
 */
defineGet(db, "withTransaction", (cb: CallBack) => {
  return (...args: unknown[]) => sequelize.transaction(() => cb(...args));
});

/**
 * Types
 */
type CallBack = (...args: unknown[]) => PromiseLike<unknown>;
type AutoCallBack<T> = (t: Transaction) => PromiseLike<T>;
