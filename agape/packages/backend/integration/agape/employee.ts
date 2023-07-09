import * as employee from "../model/employee";
import { IRoute } from "./util";

export const route: IRoute<IEmployee> = {
  findAll: "employee/findAll",
};

/**
 * Types
 */
export interface IEmployee {
  findAll(): Promise<employee.IRecord[]>;
}
