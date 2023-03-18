import { FindOptions, User } from "../../integration";

export interface Data {
  role: string;
}

export interface DataUser {
  User: User.Data;
}

export interface Model extends Data {
  employeeId: number;
}

export interface ModelUser extends Model {
  User: User.Model;
}

export interface Record extends Model {
  createdAt: Date;
  updatedAt: Date;
}

export interface RecordUser extends Record {
  User: User.Record;
}

type CreateEmployee = (data: Data) => Promise<Record>;
// type CreateEmployeeUser = (
//   data: DataUser,
//   opt: { include: [User.Include] }
// ) => Promise<RecordUser>;

type FindEmployee = (query: FindOptions<Record>) => Promise<Record>;
// type FindEmployeeUser = (
//   query: FindOptions<Record> & {
//     include: [User.IncludeFind];
//   }
// ) => Promise<RecordUser>;

export interface IEmployee {
  findAll: FindEmployee;
  create: CreateEmployee;
}
