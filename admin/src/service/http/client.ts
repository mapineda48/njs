import axios from "axios";
import { api } from "..";

import type { ReqLogIn, ResLogIn, ResIsToken } from "..";

export const client = prepareClient({
  async logOut() {
    await axios.delete(api.login);
  },

  async login(user: string, password: string) {
    const reqData: ReqLogIn = { user, password };

    const { data } = await axios.post<ResLogIn>(api.login, reqData);

    return data.token;
  },

  async isToken(token: string | null) {
    if (!token) {
      throw new Error("missing token");
    }

    const { data } = await axios.post<ResIsToken>(api.isToken, { token });

    return data.isToken;
  },
});

export default client;

export function prepareClient<T>(client: T): T {
  const val: any = Object.fromEntries(
    Object.entries(client).map(([key, method]) => [
      key,
      async (...args: any) => {
        try {
          return await method.call(null, ...args);
        } catch (error) {
          console.log(error);

          const message = error?.response?.data?.message;

          if (message) {
            throw new Error(message);
          } else {
            throw new Error("Unknown Http Error");
          }
        }
      },
    ])
  );

  return val;
}

/**
 * Types
 */

export type Client = typeof client;
