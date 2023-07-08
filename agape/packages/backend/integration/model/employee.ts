import * as ORM from "./util/orm";

export const NameModel = "Employee";

export interface IRecord extends ORM.Record {
  userId: number;
}

export type IModel = ORM.Model<IRecord, "userId">;

export type IData = ORM.Model<IRecord, "id">;
