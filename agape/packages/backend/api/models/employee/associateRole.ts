import * as ORM from "../../util/orm";

export interface IRecord extends ORM.Record {
  associateId: number;
  roleId: number;
}

export type IModel = ORM.Model<IRecord>;

export type IData = ORM.Model<IRecord, "id">;
