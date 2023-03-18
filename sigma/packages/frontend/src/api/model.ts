import Request from "./RequestPromise";
import { createApiPath } from "backend/integration";
import type { AxiosInstance } from "axios";

/**
 * https://javascript.info/promise-chaining
 */

export function createModel<T = any>(model: Model): T {
  const path = createApiPath(model.url);

  const { axios, abortController } = model;

  const parseData = (record: any): any => {
    if (!record.createdAt && !record.updatedAt) {
      return record;
    }

    const res = { ...record };

    if (res.createdAt) {
      res.createdAt = new Date(record.createdAt);
    }

    if (res.updatedAt) {
      res.updatedAt = new Date(record.updatedAt);
    }

    return model.parseData ? model.parseData(res) : res;
  };

  const destroy = (opt:any): any => {
    return new Request<any>((res, rej, signal) => {
      axios
        .post(path.destroy, opt, { signal })
        .then((res) => res.data)
        .then(res)
        .catch(rej);
    }, abortController);
  };

  const update = (...args: any[]): any => {
    return new Request<any>((res, rej, signal) => {
      axios
        .post(path.update, args, { signal })
        .then((res) => res.data.map((record: any) => parseData(record)))
        .then(res)
        .catch(rej);
    }, abortController);
  };

  const create = (...args: any[]) => {
    return new Request<any>((res, rej, signal) => {
      axios
        .post(path.create, args, { signal })
        .then((res) => parseData(res.data))
        .then(res)
        .catch(rej);
    }, abortController);
  };

  const findAndCountAll = (opt:any): any => {
    return new Request<any>((res, rej, signal) => {
      axios
        .post(path.findAndCountAll, opt, { signal })
        .then(({ data: { rows, count } }) => {
          return { rows: rows.map((record: any) => parseData(record)), count };
        })
        .then(res)
        .catch(rej);
    }, abortController);
  };

  const count = (opt:any): any => {
    return new Request<any>((res, rej, signal) => {
      axios
        .post(path.count, opt, { signal })
        .then(({ data }) => data)
        .then(res)
        .catch(rej);
    }, abortController);
  };

  const findAll = (opt:any): any => {
    return new Request<any>((res, rej, signal) => {
      axios
        .post(path.findAll, opt, { signal })
        .then(({ data }) => data.map((record: any) => parseData(record)))
        .then(res)
        .catch(rej);
    }, abortController);
  };

  const getFindAndCountAll = (query: string): any => {
    return new Request<any>((res, rej, signal) => {
      axios
        .get(path.findAndCountAll + query, { signal })
        .then(({ data: { rows, count } }) => {
          return { rows: rows.map((record: any) => parseData(record)), count };
        })
        .then(res)
        .catch(rej);
    }, abortController);
  };

  const getFindAll = (query: string): any => {
    return new Request<any>((res, rej, signal) => {
      axios
        .get(path.findAll + query, { signal })
        .then(({ data }) => data.map((record: any) => parseData(record)))
        .then(res)
        .catch(rej);
    }, abortController);
  };

  return {
    destroy,
    update,
    create,
    findAndCountAll,
    count,
    findAll,
    getFindAndCountAll,
    getFindAll,
  } as any;
}

/**
 * Types
 */
interface Model {
  url: string;
  axios: AxiosInstance;
  parseData?: <T>(data: T) => T;
  abortController?: AbortController;
}
