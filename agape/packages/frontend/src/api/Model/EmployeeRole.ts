import { AxiosInstance } from "axios";
import Model, { IModel } from "./Util/Model";
import { routeModel } from "backend";
import { IRecord, IData } from "backend/build/model/employeeRole";

const EmployeeRole: unknown = class extends Model {
  constructor(axios: AxiosInstance) {
    super(routeModel.EmployeeRole, axios);
  }
};

export default EmployeeRole as IEmployeeRole;

/**
 * Types
 */
export type IEmployeeRole = IModel<IData, IRecord>;
