import { Sequelize, Transaction } from "sequelize";
import { defineGet } from "./util";
import { sync } from "./util/sync";
import * as setting from "./setting";
import * as user from "./user";
import * as employee from "./employee";
import * as role from "./role";
import * as documentType from "./documentType";
import * as access from "./access";
import * as employeeRole from "./employeeRole";

const models = [setting, documentType, role, user, employee, access];

export interface Database {
  readonly setting: setting.IModelStatic;
  readonly documentType: documentType.IModelStatic;
  readonly user: user.IModelStatic;
  readonly role: role.IModelStatic;
  readonly employee: employee.IModelStatic;
  readonly employeeRole: employeeRole.IModelStatic;
  readonly access: access.IModelStatic;

  readonly init: (sequelize: Sequelize, version: string) => Promise<void>;
  readonly transaction: <T>(autoCallback: AutoCallBack<T>) => Promise<T>;
  readonly withTransaction: <T extends CallBack>(cb: T) => T;
  readonly models: Sequelize["models"];
}

export const apis = [
  documentType.ModelName,
  user.ModelName,
  role.ModelName,
  employeeRole.ModelName,
  employee.ModelName,
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
  Object.keys(sequelize.models).forEach((model) => {
    defineGet(db, model, sequelize.models[model]);
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
