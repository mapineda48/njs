import { insertPerson } from "component/App/state/thunk";
import { api } from "..";
import type { Http } from "../http/client";

/**
 * This file will be remove while webpack compile production build
 */

const rejs: string[] = [];

async function wait(url: string, time = 1000) {
  return new Promise<void>((res, rej) => {
    setTimeout(() => {
      if (!rejs.includes(url)) return res();

      const err = new Error("im a bad error");

      rej(err);
    }, time);
  });
}

export const http: Http = {
  async deletePerson(data) {
    await wait(api);
  },

  async updatePerson(data) {
    await wait(api);
  },

  async insertPerson(data) {
    await wait(api);
  },

  async selectPerson(opt) {
    await wait(api);

    return [
      {
        id: 0,
        full_name: "Miguel Pineda",
        dni: 12345,
        email: "foo@foo",
        address: "Av.4 6 -16",
      },
    ];
  },
};

export default http;
