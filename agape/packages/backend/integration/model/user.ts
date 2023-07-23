import * as ORM from "./util/orm";

export const NameModel = "User";

export interface IRecord extends ORM.Record {
  fullName: string;
  email: string;
  city: string;
  department: string;
  birthday: Date;
  documentNumber: number;
  documentTypeId: number;
}

export type IModel = ORM.Model<IRecord, "documentTypeId">;

export type IData = ORM.Model<IRecord, "id">;
