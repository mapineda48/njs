import axios from "axios";
import { api } from "@api";

import type { ResLogIn } from "@api";

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
  }
};
