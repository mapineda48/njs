import Request from "./RequestPromise";
import {
  ResultFindAndCountAll,
  ModelApiPath,
  FindOptions,
} from "backend/integration";
import type { AxiosInstance } from "axios";
import { buildSearchParams, getSearchParams } from "./util";

/**
 * Just the api http get method at this point, I implement this as an experimental page pagination
 */
export default class GetQueryApi<T, R = T> {
  constructor(
    protected path: ModelApiPath,
    protected axios: AxiosInstance,
    protected abortController?: AbortController
  ) {}

  getCount = (queryParams: string) => {
    return new Request<number>((res, rej, signal) => {
      const url = this.path.count + queryParams;

      this.axios
        .get<number>(url, { signal })
        .then(({ data }) => data)
        .then(res)
        .catch(rej);
    }, this.abortController);
  };

  getFindAndCountAll = (queryParams: string) => {
    return new Request<ResultFindAndCountAll<R>>((res, rej, signal) => {
      const url = this.path.findAndCountAll + queryParams;

      this.axios
        .get<ResultFindAndCountAll<R>>(url, { signal })
        .then(({ data }) => {
          data.rows = data.rows.map((row) => this.parseData(row));
          return data;
        })
        .then(res)
        .catch(rej);
    }, this.abortController);
  };

  getSearch = (queryParams: string) => {
    return new Request<R[]>((res, rej, signal) => {
      const url = this.path.search + queryParams;

      this.axios
        .get<R[]>(url, { signal })
        .then(({ data }) => {
          return data.map((record) => this.parseData(record));
        })
        .then(res)
        .catch(rej);
    }, this.abortController);
  };

  protected parseData(record: R): R;
  protected parseData(record: any): any {
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

    return res;
  }

  newSearchParam(options: FindOptions<R>) {
    return buildSearchParams(options);
  }

  parseSeachParam(search: string) {
    return getSearchParams<R>(search);
  }
}
