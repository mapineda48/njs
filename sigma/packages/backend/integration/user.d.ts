import * as integration from "./sequelize";

export const tableName = "User";

export const baseURL: string;

/**
 * Types
 */
export interface IData {
  fullName: string;
  email: string;
  city: string;
  department: string;
  birthday: Date;
}

export type IModel = integration.IModel<IData, "user">;

export type IRecord = integration.IRecord<IModel>;

export type IMethod = integration.IMethod<IData, IRecord>;
