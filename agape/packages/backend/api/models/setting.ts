import * as ORM from "../util/orm";

export interface IRecord extends ORM.Record {
  key: string;
  value: unknown;
}

export type IModel = ORM.Model<IRecord>;

export type IData = ORM.Model<IRecord, "id">;
