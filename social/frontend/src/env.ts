import { PATH_SOCIAL } from "../../lib/api/type";

export const HOST = process.env.PUBLIC_URL || "";

export const BASE_URL = HOST + PATH_SOCIAL;

export const isDev = process.env.NODE_ENV === "development";
