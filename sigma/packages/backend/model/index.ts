import { Sequelize, ConnectionError } from "sequelize";
import defineUser, { User } from "./user";
import defineSetting, { Setting } from "./setting";
import defineEmployee, { Employee } from "./employee";
import defineAccess, { Access } from "./access";

export class Database {
  public user: User;
  public employee: Employee;
  public access: Access;
  public setting: Setting;

  private constructor(public sequelize: Sequelize) {
    this.user = defineUser(sequelize);
    this.employee = defineEmployee(sequelize);
    this.access = defineAccess(sequelize);
    this.setting = defineSetting(sequelize);
  }

  private static instance: Database | null = null;

  static async init(sequelize: Sequelize) {
    await sequelize.authenticate();

    const instance = new Database(sequelize);

    await sequelize.sync();

    return (this.instance = instance);
  }

  public static get connection() {
    if (this.instance) {
      return this.instance;
    }

    throw new Error("no exists connection");
  }
}

export async function waitAuthenticate(seq: Sequelize): Promise<void> {
  try {
    await seq.authenticate();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const code = error?.original?.code;

    if (code !== "57P03" && code !== "ECONNREFUSED") {
      throw error;
    }

    /**
     * In docker compose maybe database is not ready when try connect
     * try again
     */
    console.log("the database system is starting up");
    await wait(500);
    return waitAuthenticate(seq);
  }
}

export async function wait(time: number) {
  return new Promise((res) => {
    setTimeout(res, time);
  });
}
