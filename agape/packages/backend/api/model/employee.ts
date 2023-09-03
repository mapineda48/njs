import * as ORM from "./util/orm";

export const ModelName = "employee";

export interface IRecord extends ORM.Record {
  userId: number;
}

export type IModel = ORM.Model<IRecord>;

export type IData = ORM.Model<IRecord, "id">;
