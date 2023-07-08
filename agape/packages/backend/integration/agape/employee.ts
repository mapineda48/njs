import * as employee from "../model/employee";

export const route = {
  findAll: "/api/agape/employee/findAll",
} as const;

/**
 * Types
 */
export interface IEmployee {
  findAll(): Promise<employee.IRecord[]>;
}
