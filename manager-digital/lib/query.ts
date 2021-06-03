import { amountResults } from "../src/service";

import type { Select, Insert, Update } from "../src/service";

const schema = "manager_digital";

const table = "person";

export function dlete(id: number) {
  return `DELETE FROM "${schema}"."${table}" WHERE "id" = ${id};`;
}

export function update({ id, ...person }: Update) {
  const set = Object.entries(person).map(getSet).join(", ");

  const query = `UPDATE "${schema}"."${table}" SET ${set} WHERE "id" = ${id};`;

  return query;
}

function getSet([column, value]: string[]) {
  return setColumn(column) + " = " + setValue(value);
}

export function insert(person: Insert) {
  const column = Object.keys(person).map(setColumn).join(", ");
  const value = Object.values(person).map(setValue).join(", ");

  const query = `INSERT INTO "${schema}"."${table}" (${column}) VALUES (${value});`;

  return query;
}

export function select({ startRow = 0, ...record }: Select) {
  let query = `SELECT * FROM "${schema}"."${table}"`;

  const where = Object.entries(record)
    .filter(filterValue)
    .map(getWhere)
    .join(" AND ");

  if (where) {
    query = `${query} WHERE ${where}`;
  }

  query = `${query} LIMIT ${amountResults} OFFSET ${startRow}`;

  return query + ";";
}

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

/**
 * Types
 */
