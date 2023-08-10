import axios from "axios";
import { initApi as initAgapeApi, IDashboard } from "./agape";

const baseURL =
  process.env.NODE_ENV === "production" ? "/" : "http://localhost:5000";

export function initApi() {
  const instance = axios.create({
    baseURL,
  });

  const api = initAgapeApi(instance);

  return api;
}

/**
 * Types
 */
export type { IDashboard };
