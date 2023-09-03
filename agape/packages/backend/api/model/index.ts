import { IMethod } from "./util/query";
import { toRoute } from "./util/route";
import * as DocumentType from "./documentType";
import * as Role from "./role";
import * as User from "./user";
import * as EmployeeRole from "./employeeRole";
import * as Employee from "./employee";

export const baseUrl = "/api/model/";

export const route = toRoute<IApi>(baseUrl, [
  DocumentType.ModelName,
  User.ModelName,
  Role.ModelName,
  EmployeeRole.ModelName,
  Employee.ModelName,
]);

/**
 * Types
 */

export interface IApi {
  documentType: IMethod<DocumentType.IData, DocumentType.IRecord>;
  user: IMethod<User.IData, User.IRecord>;
  role: IMethod<Role.IData, Role.IRecord>;
  employeeRole: IMethod<EmployeeRole.IData, EmployeeRole.IRecord>;
  employee: IMethod<Employee.IData, Employee.IRecord>;
}
