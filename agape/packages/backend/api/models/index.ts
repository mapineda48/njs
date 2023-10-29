import { IMethod } from "../util/query";
import * as DocumentType from "./documentType";
import * as User from "./user";
import * as employee from "./employee";
import * as inventory from "./inventory";

export default interface IApi {
  documentType: IMethod<DocumentType.IData, DocumentType.IRecord>;
  user: IMethod<User.IData, User.IRecord>;
  employee: employee.IApi;
  inventory: inventory.IApi;
}

export const Op = {
  eq: "Op'eq",
  ne: "Op'ne",
  gte: "Op'gte",
  gt: "Op'gt",
  lte: "Op'lte",
  lt: "Op'lt",
  not: "Op'not",
  is: "Op'is",
  in: "Op'in",
  notIn: "Op'notIn",
  like: "Op'like",
  notLike: "Op'notLike",
  iLike: "Op'iLike",
  notILike: "Op'notILike",
  startsWith: "Op'startsWith",
  endsWith: "Op'endsWith",
  substring: "Op'substring",
  regexp: "Op'regexp",
  notRegexp: "Op'notRegexp",
  iRegexp: "Op'iRegexp",
  notIRegexp: "Op'notIRegexp",
  between: "Op'between",
  notBetween: "Op'notBetween",
  overlap: "Op'overlap",
  contains: "Op'contains",
  contained: "Op'contained",
  adjacent: "Op'adjacent",
  strictLeft: "Op'strictLeft",
  strictRight: "Op'strictRight",
  noExtendRight: "Op'noExtendRight",
  noExtendLeft: "Op'noExtendLeft",
  and: "Op'and",
  or: "Op'or",
  any: "Op'any",
  all: "Op'all",
  values: "Op'values",
  col: "Op'col",
  placeholder: "Op'placeholder",
  join: "Op'join",
  match: "Op'match",
} as const;

type Op = typeof Op;

export type OperatorKey = Op[keyof Op];
