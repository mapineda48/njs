import { Pool } from "pg";
import {
  DataBase,
  Table,
  PreviewEmployee,
  Results,
  Option,
} from "../src/shared";

const tables = [
  "type_client",
  "client",
  "type_employee",
  "employee",
  "supplier",
  "product",
  "sell",
  "buy",
] as const;

const login: LogIn = async function(username, password) {
  const query = `SELECT
            "id",
            "dni",
            "firstName",
            "lastName",
            "username",
            "phone",
            "email",
            "addres",
            "type"
          FROM
            "agape"."v_employee"
          WHERE
            "username"='${username}'
            AND "password"='${password}'`;

  const { rows } = await this.pool.query(query);

  const [employee] = rows;

  return employee;
};

/**
 * Select table's records from postgres server
 * @param table name table on schema agape
 * @param opt sql options to query
 */
const select: Select = async function(table, opt) {
  const { column, where, limit, offset } = opt;

  const columns = !column
    ? "*"
    : !Array.isArray(column)
    ? column
    : column.map((col) => `"${col}"`).join(", ");

  const query = ["SELECT", `${columns}`, "FROM", `"agape"."v_${table}"`];

  if (where) {
    const { column, value } = where;
    const isNumber = /^[0-9.]*$/g.test(value);
    query.push(
      "WHERE",
      `"${column}"`,
      "=",
      isNumber ? `${value}` : `'${value}'`
    );
  }

  query.push("LIMIT", limit ? limit.toString() : "10");

  query.push("OFFSET", offset ? offset.toString() : "0");

  const { rows } = await this.pool.query(query.join(" "));

  return rows;
};

const insert: Insert = async function(table, input) {
  const json = JSON.stringify(input);

  const query = `SELECT * FROM "agape"."f_insert_${table}"('${json}'::jsonb);`;

  const { rows } = await this.pool.query(query);

  const [result] = rows;

  return result;
};

const update: Update = async function(table, id, input) {
  const json = JSON.stringify(input);

  const query = `SELECT * FROM "agape"."f_update_${table}"(${id}::integer,'${json}'::jsonb);`;

  const { rows } = await this.pool.query(query);

  const [record] = rows;

  return record;
};

const dlete: Delete = async function(table, id) {
  const query = `SELECT * FROM "agape"."f_delete_${table}"(${id}::integer);`;

  const { rows } = await this.pool.query(query);

  const [record] = rows;

  return record;
};

export default function create(pool: Pool) {
  return { pool, tables, login, select, insert, update, delete: dlete };
}

/**
 * Typings
 */
interface DML {
  pool: Pool;
}

type LogIn = (
  this: DML,
  username: string,
  password: string
) => Promise<PreviewEmployee | undefined>;

type Select = <T extends Table>(
  this: DML,
  table: T,
  opt: Option<T>
) => Promise<Results<T>>;

export type IInsert<T extends Table> = Omit<DataBase[T], "id">;

export type Insert = <T extends Table>(
  this: DML,
  table: T,
  input: IInsert<T>
) => Promise<DataBase[T]>;

export type IUpdate<T extends Table> = {
  id: number;
  input: Partial<IInsert<T>>;
};

export type Update = <T extends Table>(
  this: DML,
  table: T,
  id: number,
  input: IUpdate<T>
) => Promise<DataBase[T] | undefined>;

export type Delete = <T extends Table>(
  this: DML,
  table: T,
  id: number
) => Promise<DataBase[T]>;
