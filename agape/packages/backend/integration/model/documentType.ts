import * as ORM from "./util/orm";

export const NameModel = "DocumentType";

export interface IRecord extends ORM.Record {
  fullName: string;
  code: string;
  isEnabled: boolean;
}

export type IModel = ORM.Model<IRecord>;

export type IData = ORM.Model<IRecord, "id">;
