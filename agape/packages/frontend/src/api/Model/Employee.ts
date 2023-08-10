import { AxiosInstance } from "axios";
import Model, { IModel } from "./Util/Model";
import { routeModel } from "backend";
import { IRecord, IData } from "backend/integration/model/role";

const Employee: unknown = class extends Model {
  constructor(axios: AxiosInstance) {
    super(routeModel.Employee, axios);
  }
};

export default Employee as IEmployee;

/**
 * Types
 */
export type IEmployee = IModel<IData, IRecord>;
