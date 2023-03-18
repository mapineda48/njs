import { createModel } from "api/model";
import RequestPromise from "api/RequestPromise";
import axioslib, { AxiosInstance } from "axios";
import { User } from "backend/integration";

export default class ProtectedApi {
  axios: AxiosInstance;
  user: User.IMethod;

  constructor(axios: AxiosInstance, abortController?: AbortController) {
    this.axios = axios ?? axioslib.create();

    this.user = createModel<User.IMethod>({
      axios,
      url: User.baseURL,
      abortController,
      parseData(user: any) {
        return { ...user, birthday: new Date(user.birthday) };
      },
    });
  }

  /**
   * Set all request same abort controller
   */
  multi<R>(cb: (api: ProtectedApi) => Promise<R>) {
    const abortController = new AbortController();
    
    return new RequestPromise<R>((res, rej) => {
      const api = new ProtectedApi(this.axios, abortController);

      const promise = cb(api);

      promise.then(res).catch(rej);
    }, abortController);
  }
}