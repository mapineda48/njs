import { agape as api } from "../baseUrl";
import { uploadFile } from "./uploadFile";

/**
 * Endpoint
 */
export const route = api<IApi>(["uploadFile"]);

/**
 * Custom client handler
 */
export const client = {
  uploadFile,
};

/**
 * Types
 */
export type UploadFile = (file: File, fileName: string) => Promise<string>;

export interface IApi {
  uploadFile: UploadFile;
}
