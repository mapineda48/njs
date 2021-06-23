import { api } from "..";
import type { Client } from "../http/client";

const rejs: string[] = [];

function doAsync(url: string, time = 1000) {
  return new Promise<void>((res, rej) => {
    setTimeout(() => {
      if (rejs.includes(url)) return rej(new Error("unknown error"));

      res();
    }, time);
  });
}

export const client: Client = {
  async logOut() {
    await doAsync(api.login);
  },

  async isToken(token) {
    await doAsync(api.isToken);

    return false;
  },

  async login(user, password) {
    await doAsync(api.login);

    return "im a secret token";
  },
};

export default client;
