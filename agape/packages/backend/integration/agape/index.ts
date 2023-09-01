import { route as employee, IEmployee } from "./employee";
import { IApi, toRoute } from "./util";

export const baseUrl = "/api/dashboard";

export const field = {
  helloWorld: ["foo"],
};

export const route = toRoute<IBackend>(baseUrl, {
  helloWorld: null,
  greet: null,
  uploadPublic: "upload/public",
  employee,
});

/**
 * Types
 */
export type IFrontEnd = IApi<IBackend>;

export interface IBackend {
  helloWorld(): string;
  greet(name: string): string;
  uploadPublic(file: File, filename: string): string;
  employee: IEmployee;
}
