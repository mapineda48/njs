import Request from "./RequestPromise";
import {
  createModelApiPath,
  DestroyOptions,
  UpdateOptions,
} from "backend/integration";
import type { AxiosInstance } from "axios";
import GetQueryApi from "./GetQueryApi";

/**
 * https://javascript.info/promise-chaining
 */

export default class ModelApi<T, R = T> extends GetQueryApi<T, R> {
  constructor(
    url: string,
    axios: AxiosInstance,
    abortController?: AbortController
  ) {
    const path = createModelApiPath(url);
    super(path, axios, abortController);
  }

  destroy = (findOptions: DestroyOptions<R>) => {
    return new Request<number>((res, rej, signal) => {
      const url = this.path.destroy + this.newSearchParam(findOptions);

      this.axios
        .delete<number>(url, { signal })
        .then((res) => res.data)
        .then(res)
        .catch(rej);
    }, this.abortController);
  };

  update = (data: Partial<T>, findOptions: UpdateOptions<R>) => {
    return new Request<R[]>((res, rej, signal) => {
      const url = this.path.update + this.newSearchParam(findOptions);

      this.axios
        .put<R[]>(url, data, { signal })
        .then((res) => res.data.map((record) => this.parseData(record)))
        .then(res)
        .catch(rej);
    }, this.abortController);
  };

  create = (data: T) => {
    return new Request<R>((res, rej, signal) => {
      this.axios
        .post<R>(this.path.create, data, { signal })
        .then((res) => this.parseData(res.data))
        .then(res)
        .catch(rej);
    }, this.abortController);
  };
}
