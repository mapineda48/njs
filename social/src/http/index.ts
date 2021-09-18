import axios from "axios";
import { api } from "./type";

import type { ResLogIn } from "./type";

export const prod = {
  axios,
  url: "",
};

export const client = {
  async login(username: string, password: string) {
    const res = await prod.axios.post(prod.url + api.login, {
      username,
      password,
    });

    return res.data as ResLogIn;
  },
  async logout(token: string) {
    await prod.axios.post(prod.url + api.logout, { token });
  },
};
