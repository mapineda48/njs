import { amountResults, Select, Insert, Update } from "./type";

function setColumn(column: string) {
  return `"${column}"`;
}

function isString(value: any): value is string {
  return typeof value === "string";
}

function setValue(value: any) {
  return isString(value) ? `'${value}'` : value;
}

function getWhere([column, value]: string[]) {
  const operator = isString(value) ? "~" : "=";

  return `${setColumn(column)} ${operator} ${setValue(value)}`;
}

function filterValue([column, value]: string[]) {
  return Boolean(value);
}

export function select({ startRow = 0, ...person }: Select) {
  let query = `SELECT * FROM "sigma"."person"`;

  const where = Object.entries(person)
    .filter(filterValue)
    .map(getWhere)
    .join(" AND ");

  if (where) {
    query = `${query} WHERE ${where}`;
  }

  query = `${query} LIMIT ${amountResults} OFFSET ${startRow}`;

  return query + ";";
}

export function insert(person: Insert) {
  const column = Object.keys(person).map(setColumn).join(", ");
  const value = Object.values(person).map(setValue).join(", ");

  const query = `INSERT INTO "sigma"."person" (${column}) VALUES (${value});`;

  return query;
}

function getSet([column, value]: string[]) {
  return setColumn(column) + " = " + setValue(value);
}

export function update({ id, ...person }: Update) {
  const set = Object.entries(person).map(getSet).join(", ");

  const query = `UPDATE "sigma"."person" SET ${set} WHERE "id" = ${id};`;

  return query;
}

export function dlete(id: number) {
  return `DELETE FROM "sigma"."person" WHERE "id" = ${id};`;
}

/**
 * Types
 */

export type { Select, Insert, Update };
