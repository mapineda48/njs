import axios from "./axios";
import type IAuth from "../auth";
import type IModel from "../model";
import type IAgape from "../agape";

let cache: IRoute | null = null;

export default function api() {
  if (cache) {
    return Promise.resolve(cache);
  }

  return axios.get<IRoute>("/api").then(({ data }) => (cache = data));
}


/**
 * Types
 */
export type { IModel };

export type IRoute = ToRoute<{
  auth: IAuth;
  model: {
    [K in keyof IModel]: string;
  };
  agape: IAgape
}>;

type ToRoute<T> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [K in keyof T]: T[K] extends (...args: any[]) => any
    ? string
    : T[K] extends object
    ? ToRoute<T[K]>
    : never;
};
