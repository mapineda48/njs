import { AxiosInstance } from "axios";
import Model, { IModel } from "./Util/Model";
import { routeModel } from "backend";
import { IRecord, IData } from "backend/build/model/role";

const Role: unknown = class extends Model {
  constructor(axios: AxiosInstance) {
    super(routeModel.Role, axios);
  }
};

export default Role as IRole;

/**
 * Types
 */
export type IRole = IModel<IData, IRecord>;
