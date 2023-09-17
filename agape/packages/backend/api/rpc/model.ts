import type { AxiosInstance as Axios } from "axios";
import type IModel from "../model";

export default function initModels(axios: Axios, route: IApi) {
  const api: unknown = Object.fromEntries(
    Object.entries(route).map(([modelName, path]) => [
      modelName,
      initModel(axios, path),
    ])
  );

  return api as IModel;
}

export function initModel(axios: Axios, path: string, parse = parseRecord) {
  const destroy = (data: unknown): unknown => {
    return axios.delete(path, { data }).then((res) => res.data);
  };

  const update = (...args: unknown[]): unknown => {
    return axios
      .put(path, args)
      .then((res) => res.data.map((record: object) => parse(record)));
  };

  const create = (data: unknown) => {
    return axios.post(path, data).then((res) => parse(res.data));
  };

  const findAndCountAll = (opt: unknown): unknown => {
    return axios
      .post(`${path}/findAndCountAll`, opt)
      .then(({ data: { rows, count } }) => {
        return {
          rows: rows.map((record: object) => parse(record)),
          count,
        };
      });
  };

  const count = (opt: unknown): unknown => {
    return axios.post(`${path}/count`, opt).then(({ data }) => data);
  };

  const findAll = (opt: unknown): unknown => {
    return axios
      .post(`${path}/findAll`, opt)
      .then(({ data }) => data.map((record: object) => parse(record)));
  };

  return {
    count,
    findAll,
    findAndCountAll,
    create,
    update,
    destroy,
  };
}

export function parseRecord(record: object): object {
  if ("createdAt" in record) {
    record.createdAt = new Date(record.createdAt as string);
  }

  if ("updatedAt" in record) {
    record.updatedAt = new Date(record.updatedAt as string);
  }

  return record;
}

/**
 * Types
 */
interface IApi {
  [K: string]: string;
}

export type { IModel };
