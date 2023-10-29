import { Sequelize, Transaction } from "sequelize";
import { defineGet } from "@util/models";
import { sync } from "@util/models/sync";
import * as setting from "./setting";
import * as user from "./user";
import * as employee from "./employee";
import * as documentType from "./documentType";
import * as inventory from "./inventory";
import { toMap } from "@util/models/toMap";

const models = [setting, documentType, user, employee, inventory];

export interface Database {
  readonly setting: setting.IModelStatic;
  readonly documentType: documentType.IModelStatic;
  readonly user: user.IModelStatic;
  readonly employee: employee.IModelStatic;
  readonly inventory: inventory.IModelStatic;

  readonly init: (sequelize: Sequelize, version: string) => Promise<void>;
  readonly transaction: <T>(autoCallback: AutoCallBack<T>) => Promise<T>;
  readonly withTransaction: <T extends CallBack>(cb: T) => T;
  readonly models: Sequelize["models"];
}

export const apis = [
  documentType.ModelName,
  user.ModelName,
  ...employee.apis,
  ...inventory.apis,
];

const db: unknown = {};

function defineModels(sequelize: Sequelize) {
  /**
   *
   */
  models.forEach((model) => {
    model.define(sequelize);
  });

  /**
   *
   */
  Object.entries(toMap(sequelize.models)).forEach(([key, model]) => {
    defineGet(db, key, model);
  });

  /**
   *
   */
  defineGet(db, "models", sequelize.models);

  /**
   *
   */
  defineGet(db, "transaction", (cb: AutoCallBack<unknown>) =>
    sequelize.transaction(cb)
  );

  /**
   *
   */
  defineGet(db, "withTransaction", (cb: CallBack) => {
    return (...args: unknown[]) => sequelize.transaction(() => cb(...args));
  });
}

async function init(sequelize: Sequelize, version: string) {
  await sequelize.authenticate();

  defineModels(sequelize);

  await sequelize.sync();

  await sync(version);
}

defineGet(db, "init", init);

export default db as Database;

/**
 * Types
 */
type CallBack = (...args: unknown[]) => PromiseLike<unknown>;
type AutoCallBack<T> = (t: Transaction) => PromiseLike<T>;
