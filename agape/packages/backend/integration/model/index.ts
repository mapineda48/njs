import * as DocumentType from "./documentType";
import * as Role from "./role";
import * as User from "./user";
import * as EmployeeRole from "./employeeRole";
import * as Employee from "./employee";
import { IMethod } from "./util/query";
import { createPath } from "./util/route";

const baseUrl = "/api/model/";

export const route = {
  [DocumentType.NameModel]: createPath(baseUrl, DocumentType.NameModel),
  [User.NameModel]: createPath(baseUrl, User.NameModel),
  [Role.NameModel]: createPath(baseUrl, Role.NameModel),
  [Employee.NameModel]: createPath(baseUrl, Employee.NameModel),
  [EmployeeRole.NameModel]: createPath(baseUrl, EmployeeRole.NameModel),
} as const;

export const routes: RouteModel[] = Object.entries(route).map(
  ([NameModel, Path]) => ({ NameModel, Path })
);

/**
 * Types
 */
export type IDocumentType = IMethod<DocumentType.IData, DocumentType.IRecord>;
export type IUser = IMethod<User.IData, User.IRecord>;
export type IRole = IMethod<Role.IData, Role.IRecord>;
export type IEmployeeRole = IMethod<EmployeeRole.IData, EmployeeRole.IRecord>;
export type IEmployee = IMethod<Employee.IData, Employee.IRecord>;

export interface RouteModel {
  NameModel: string;
  Path: string;
}
