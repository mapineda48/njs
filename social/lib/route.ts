import * as path from "path";
import * as express from "express";
import { ServerIO, setChat } from "./socket";
import api from "./api";
import Auth from "./auth";
import Store from "./store";

import type { Pool } from "pg";

const frontend = "../frontend/build";

export function createSocial(options: Options) {
  const { username, password, keyToTokens, io, pg } = options;

  const router = express.Router();

  const store = new Store(pg);

  const auth = new Auth({ username, password, key: keyToTokens, store });

  setChat({ io, store, auth });

  router.use(api(auth));

  router.use(express.static(path.join(__dirname, frontend)));

  return express.Router().use("/social", router);
}

export interface Options {
  username: string;
  password: string;
  keyToTokens: string;
  io: ServerIO;
  pg: Pool;
}
