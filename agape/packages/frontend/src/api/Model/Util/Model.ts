import { IMethod } from "backend/integration/model/util/query";

import type { AxiosInstance } from "axios";

/**
 * https://javascript.info/promise-chaining
 */

export default class BaseModel {
  constructor(private path: string, private axios: AxiosInstance) {}

  public destroy = (data: any): any => {
    return this.axios.delete(this.path, { data }).then((res) => res.data);
  };

  public update = (...args: any[]): any => {
    return this.axios
      .put(this.path, args)
      .then((res) => res.data.map((record: any) => this.parseRecord(record)));
  };

  public create = (data: any) => {
    return this.axios
      .post(this.path, data)
      .then((res) => this.parseRecord(res.data));
  };

  public findAndCountAll = (opt: any): any => {
    return this.axios
      .post(`${this.path}/findAndCountAll`, opt)
      .then(({ data: { rows, count } }) => {
        return {
          rows: rows.map((record: any) => this.parseRecord(record)),
          count,
        };
      });
  };

  public count = (opt: any): any => {
    return this.axios.post(`${this.path}/count`, opt).then(({ data }) => data);
  };

  public findAll = (opt: any): any => {
    return this.axios
      .post(`${this.path}/findAll`, opt)
      .then(({ data }) => data.map((record: any) => this.parseRecord(record)));
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
  new (axios: AxiosInstance): IModel<D, R>;
}
