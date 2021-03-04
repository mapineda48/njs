import axios from "axios";
import queryString from "query-string";
import mock from "./mocks";

import { Table, Option, IInsert, IUpdate, DataBase, Auth } from "shared";

const host = window.location.pathname + 'api/';

const handlerError = (config: any) => {
  console.log(config);

  const message = config?.response?.data?.message;

  if (message) {
    throw new Error(message);
  } else {
    throw new Error("Unknown Http Error");
  }
};

export const login: LogIn = async (username, password) => {
  try {
    const response = await axios.post(host + "login", {
      username,
      password,
    });

    return response.data;
  } catch (error) {
    handlerError(error);
  }
};

const db = host + "db/";

export const select: Select = async (token, table, opt) => {
  try {
    const query = queryString.stringify({ opt: JSON.stringify(opt) });

    const url = db + table + "?" + query;

    const result = await axios.get(url, {
      headers: { "access-token": token },
    });

    return result.data;
  } catch (error) {
    handlerError(error);
  }
};

export const insert: Insert = async (token, table, input) => {
  try {
    const url = db + table;

    const { data } = await axios.post(url, input, {
      headers: { "access-token": token },
    });

    return data;
  } catch (error) {
    handlerError(error);
  }
};

export const update: Update = async (token, table, input) => {
  try {
    const url = db + table;

    const result = await axios.put(url, input, {
      headers: { "access-token": token },
    });

    return result.data;
  } catch (error) {
    handlerError(error);
  }
};

export const dlete: Delete = async (token, table, id) => {
  try {
    const url = db + table + "?id=" + id;

    const result = await axios.delete(url, {
      headers: { "access-token": token },
    });

    return result.data;
  } catch (error) {
    handlerError(error);
  }
};

export default process.env.NODE_ENV === "development"
  ? mock
  : {
      login,
      select,
      insert,
      update,
      delete: dlete,
    };

/**
 * Typings
 */

export type LogIn = (username: string, password: string) => Promise<Auth>;

export type Select = <T extends Table>(
  token: string,
  table: T,
  opt: Option<T>
) => Promise<DataBase[T][]>;

export type Insert = <T extends Table>(
  token: string,
  table: T,
  input: IInsert<T>
) => Promise<DataBase[T]>;

export type Update = <T extends Table>(
  token: string,
  table: T,
  input: IUpdate<T>
) => Promise<DataBase[T]>;

export type Delete = <T extends Table>(
  token: string,
  table: T,
  id: number
) => Promise<DataBase[T]>;
