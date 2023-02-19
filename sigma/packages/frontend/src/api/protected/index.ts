import RequestPromise from "api/RequestPromise";
import axios from "axios";
import UsersModel from "./user";

export default class ProtectedApi {
  user: UsersModel;

  constructor(
    protected axiosInstance = axios.create(),
    abortController?: AbortController
  ) {
    this.user = new UsersModel(axiosInstance, abortController);
  }

  /**
   * Set all request same abort controller
   */
  multi<R>(cb: (api: ProtectedApi) => Promise<R>) {
    const abortController = new AbortController();
    return new RequestPromise<R>((res, rej) => {
      const api = new ProtectedApi(this.axiosInstance, abortController);

      const promise = cb(api);

      promise.then(res).catch(rej);
    }, abortController);
  }
}
