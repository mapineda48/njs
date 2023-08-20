import * as employee from "../model/employee";
import { toRoute } from "./util";

export const route = toRoute<IEmployee>("agape/employee", {
  findAll: null,
});

/**
 * Types
 */
export interface IEmployee {
  findAll(): Promise<employee.IRecord[]>;
}
