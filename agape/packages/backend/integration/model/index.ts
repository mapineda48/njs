import { IMethod } from "./util/query";
import { IRoute, setBaseURL as setRoute } from "./util/route";
import * as DocumentType from "./documentType";
import * as Role from "./role";
import * as User from "./user";
import * as EmployeeRole from "./employeeRole";
import * as Employee from "./employee";

export const baseUrl = "/api/model/";

export const model: IRoute<IFrontEnd> = {
  documentType: DocumentType.NameModel,
  user: User.NameModel,
  role: Role.NameModel,
  employee: Employee.NameModel,
  employeeRole: EmployeeRole.NameModel,
};

export const route = setRoute(model, baseUrl);

export const routes: RouteModel[] = Object.entries(route).map((entrie) => {
  const [key, route] = entrie as Entrie;

  return { NameModel: model[key], Path: route };
});

/**
 * Types
 */

export interface IFrontEnd {
  documentType: IMethod<DocumentType.IData, DocumentType.IRecord>;
  user: IMethod<User.IData, User.IRecord>;
  role: IMethod<Role.IData, Role.IRecord>;
  employeeRole: IMethod<EmployeeRole.IData, EmployeeRole.IRecord>;
  employee: IMethod<Employee.IData, Employee.IRecord>;
}

export interface RouteModel {
  NameModel: string;
  Path: string;
}

type Entrie = [keyof typeof model, string];
