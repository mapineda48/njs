import { IMethod } from "backend/build/model/util/query";
import Request from "./Request";

import type { AxiosInstance } from "axios";

/**
 * https://javascript.info/promise-chaining
 */

export default class BaseModel {
  constructor(private path: string, private axios: AxiosInstance) {}

  public destroy = (data: any): any => {
    return new Request((abort) => {
      return this.axios
        .delete(this.path, { signal: abort, data })
        .then((res) => res.data);
    });
  };

  public update = (...args: any[]): any => {
    return new Request((abort) => {
      return this.axios
        .put(this.path, args, { signal: abort })
        .then((res) => res.data.map((record: any) => this.parseRecord(record)));
    });
  };

  public create = (data: any) => {
    return new Request((abort) => {
      return this.axios
        .post(this.path, data, { signal: abort })
        .then((res) => this.parseRecord(res.data));
    });
  };

  public findAndCountAll = (opt: any): any => {
    return new Request((abort) => {
      return this.axios
        .post(`${this.path}/findAndCountAll`, opt, { signal: abort })
        .then(({ data: { rows, count } }) => {
          return {
            rows: rows.map((record: any) => this.parseRecord(record)),
            count,
          };
        });
    });
  };

  public count = (opt: any): any => {
    return new Request((abort) => {
      return this.axios
        .post(`${this.path}/count`, opt, { signal: abort })
        .then(({ data }) => data);
    });
  };

  public findAll = (opt: any): any => {
    return new Request((abort) => {
      return this.axios
        .post(`${this.path}/findAll`, opt, { signal: abort })
        .then(({ data }) =>
          data.map((record: any) => this.parseRecord(record))
        );
    });
  };

  protected parseRecord(record: object): any {
    if ("createdAt" in record) {
      record.createdAt = new Date(record.createdAt as string);
    }

    if ("updatedAt" in record) {
      record.updatedAt = new Date(record.updatedAt as string);
    }

    return record;
  }
}

/**
 * Types
 */

export interface IModel<D, R> extends IMethod<D, R> {
  new (axios: AxiosInstance, abortController?: AbortController): IModel<D, R>;
}
