import { Sequelize, Transaction } from "sequelize";
import * as user from "./user";
import * as employee from "./employee";
import * as role from "./role";
import * as documentType from "./documentType";

const DatabaseNotReady = "database not init";
export default class Database {
  private static seq: Sequelize;

  public static async init(sequelize: Sequelize) {
    await sequelize.authenticate();

    documentType.create(sequelize);
    user.create(sequelize);
    role.create(sequelize);
    employee.create(sequelize);

    await sequelize.sync();

    this.seq = sequelize;
  }

  public static get documentType(): documentType.IDocumentType {
    return Database.seq.models[documentType.NameModel];
  }

  public static get user(): user.IUser {
    return Database.seq.models[user.NameModel];
  }

  public static get role(): role.IRole {
    return Database.seq.models[role.NameModel];
  }

  public static get employee(): employee.IEmployee {
    return Database.seq.models[employee.NameModel];
  }

  public static transaction<T>(autoCallback: AutoCallBack<T>) {
    return Database.seq.transaction(autoCallback);
  }

  public static withTransaction<T extends CallBack>(cb: T): T {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const thunk: any = (...args: unknown[]) =>
      Database.seq.transaction(() => cb(...args));

    return thunk;
  }

  public static get sequelize() {
    if (this.seq) {
      return this.seq;
    }

    throw new Error(DatabaseNotReady);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}
}

/**
 * Types
 */

type CallBack = (...args: unknown[]) => PromiseLike<unknown>;

type AutoCallBack<T> = (t: Transaction) => PromiseLike<T>;
