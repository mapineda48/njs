import { route as employee, IEmployee } from "./employee";
import { IFrontEndMethod, IRoute, setBaseURL } from "./util";

export const baseUrl = "/api/dashboard/protected/";

export const path: IRoute<IBackend> = {
  helloWorld: "helloWorld",
  greet: "greet",
  uploadPublic: "upload/public",
  employee,
};

export const route = setBaseURL(path, baseUrl);

/**
 * Types
 */
export interface IBackend {
  helloWorld(): string;
  greet(name: string): string;
  uploadPublic(file: File, filename: string): string;
  employee: IEmployee;
}

export type IFrontEnd = IFrontEndMethod<IBackend>;
