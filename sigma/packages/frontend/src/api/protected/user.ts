import { apiPath, User } from "backend/integration";
import ModelApi from "../ModelApi";
import type { AxiosInstance } from "axios";

const userPath = apiPath.protected.model.user;

export default class UsersModelAPI extends ModelApi<User.Data, User.Record> {
  constructor(axios: AxiosInstance, abortController?: AbortController) {
    super(userPath, axios, abortController);
  }

  parseData(user: User.Record) {
    return super.parseData({ ...user, birthday: new Date(user.birthday) });
  }
}
