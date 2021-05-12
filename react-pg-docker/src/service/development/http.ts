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
  async greet() {
    await wait(api);

    return { message: "Hello World ReactJS" };
  },
};

export default http;
