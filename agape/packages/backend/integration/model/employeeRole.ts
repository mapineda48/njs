import * as ORM from "./util/orm";

export const ModelName = "employeeRole";

export interface IRecord extends ORM.Record {
  employeeId: number;
  roleId: number;
}

export type IModel = ORM.Model<IRecord, "id">;

export type IData = ORM.Model<IRecord, "id">;
