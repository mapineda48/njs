import { route as employee, IEmployee } from "./employee";
import { IFrontEndMethod } from "./util";

export const route = {
  helloWorld: "/api/agape/helloWorld",
  greet: "/api/agape/greet",
  uploadPublic: "/api/agape/uploadPublic",
  employee,
} as const;

/**
 * Types
 */
export interface IAgapeBackend {
  helloWorld(): string;
  greet(name: string): string;
  uploadPublic(filename: string, file: File): string;
  employee: IEmployee;
}

export type IAgapeFrontEnd = IFrontEndMethod<IAgapeBackend>;
