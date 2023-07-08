import { AxiosInstance } from "axios";
import Model, { IModel } from "./Util/Model";
import { routeModel } from "backend";
import { IRecord, IData } from "backend/build/model/user";

const User: unknown = class extends Model {
  constructor(axios: AxiosInstance) {
    super(routeModel.User, axios);
  }

  protected parseRecord(record: IRecord) {
    if ("birthday" in record) {
      record.birthday = new Date(record.birthday);
    }

    return super.parseRecord(record);
  }
};

export default User as IUser;

/**
 * Types
 */
export type IUser = IModel<IData, IRecord>;
