import { api, ResLogIn } from "../../http/type";
import * as http from "../../http";

const rejs: string[] = [];

export function mockAxios() {
  http.prod.axios = {
    post,
  } as any;
}

async function post(url: string, ...args: any[]) {
  await wait(url);

  switch (url) {
    case api.login: {
      const data: ResLogIn = {
        token: "secret here",
      };

      return { data };
    }
    case api.logout: {
      return {};
    }

    default: {
      throw new Error(`mock http no found "${url}"`);
    }
  }
}

export async function wait(url: string, time = 1000) {
  return new Promise<void>((res, rej) => {
    setTimeout(() => {
      if (!rejs.includes(url)) return res();

      rej(new Error("Ups..."));
    }, time);
  });
}
