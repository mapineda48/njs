import axios, { CreateAxiosDefaults, AxiosInstance } from "axios";

const baseURL =
  process.env.NODE_ENV === "production" ? "/" : "http://localhost:5000";

export default function create(config?: CreateAxiosDefaults) {
  return axios.create({
    ...config,
    baseURL,
  });
}

/**
 * Types
 */
export type { AxiosInstance };
