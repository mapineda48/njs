import type { AxiosInstance } from "axios";
import { route, IApi } from "..";

export function initModels(axios: AxiosInstance) {
  const api: unknown = Object.fromEntries(
    Object.entries(route).map(([modelName, path]) => [
      modelName,
      initModel(path, axios),
    ])
  );

  return api as IApi;
}

export function initModel(
  path: string,
  axios: AxiosInstance,
  parse = parseRecord
) {
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
