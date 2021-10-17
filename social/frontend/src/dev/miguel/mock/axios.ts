import { api, ResLogIn } from "@api";

const rejs: string[] = [];

async function post(url: string, ...args: any[]) {
  await wait(url);

  switch (url) {
    case api.login: {
      const data: ResLogIn = {
        token: "secret here",
      };

      return { data };
    }
    default: {
      throw new Error(`mock http no found "${url}"`);
    }
  }
}

export async function wait(url = "unknwon", time = 1000) {
  return new Promise<void>((res, rej) => {
    setTimeout(() => {
      if (!rejs.includes(url)) return res();

      rej(new Error("Ups..."));
    }, time);
  });
}

const axios = {
  post,
};

export default axios;
