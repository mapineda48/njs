import * as integration from "../sequelize/type";

export const ModelName = "User";

/**
 * Types
 */
export interface Data {
  fullName: string;
  email: string;
  city: string;
  department: string;
  birthday: Date;
}

export type Model = integration.Model<Data, "user">;

export type Record = integration.Record<Model>;

export type IUser = integration.PostMethod<Data, Record>;
