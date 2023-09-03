import { agape as api } from "../baseUrl";

export const route = api<IApi>(["uploadFile"]);

/**
 * Types
 */
export type UploadFile = (file: File, fileName: string) => Promise<string>;

export interface IApi {
  uploadFile: UploadFile;
}
