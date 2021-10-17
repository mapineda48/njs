import * as path from "path";
import * as express from "express";
import { ServerIO, setChat } from "./socket";
import api from "./api";
import { initAuth } from "./auth";
import initStore from "./store";

import type { Pool } from "pg";

const frontend = "../frontend/build";

export function createSocial(options: Options) {
  const { username, password, keyToTokens, io, pg } = options;

  const router = express.Router();

  const store = initStore(pg);

  setChat(io, store);

  const session = initAuth(keyToTokens, username, password);

  router.use(api(session));

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
