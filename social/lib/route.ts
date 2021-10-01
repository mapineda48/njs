import * as path from "path";
import * as express from "express";
import api from "./api";
import type { ServerIO } from "./socket";

const frontend = "../frontend/build";

export function createSocial(username: string, password: string, io: ServerIO) {
  const router = express.Router();

  router.use(api(username, password, io));

  router.use(express.static(path.join(__dirname, frontend)));

  return express.Router().use("/social", router);
}
