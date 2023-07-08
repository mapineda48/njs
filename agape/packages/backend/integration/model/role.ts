import * as ORM from "./util/orm";

export const NameModel = "Role";

export interface IRecord extends ORM.Record {
  fullName: string;
}

export type IModel = ORM.Model<IRecord>;

export type IData = ORM.Model<IRecord, "id">;
