import * as ORM from "./util/orm";

export const ModelName = "user";

export interface IRecord extends ORM.Record {
  fullName: string;
  email: string;
  city: string;
  department: string;
  birthday: Date;
  documentNumber: string;
  documentTypeId: number;
}

export type IModel = ORM.Model<IRecord>;

export type IData = ORM.Model<IRecord, "id">;
