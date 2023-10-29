import * as ORM from "../../util/orm";

export interface IRecord extends ORM.Record {
  employeeId: number;
  username: string;
  password: string;
  isEnabled: boolean;
}

export type IModel = ORM.Model<IRecord>;

export type IData = ORM.Model<IRecord, "id">;
