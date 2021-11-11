import * as path from "path";
import * as express from "express";
import webPush from "web-push";
import { ServerIO, setChat } from "./socket";
import api from "./api";
import Auth from "./auth";
import createModel from "./models";
import Cache from "./cache";
import prepareNotify from "./web-push";

import type { RedisClient } from "redis";
import type { Sequelize } from "sequelize";

const frontend = "../frontend/build";

const subject = "mailto:example@yourdomain.org";

export async function prepareSocial(opt: Options) {
  const { username, password, keyToTokens, io, seq, redis } = opt;

  const model = await createModel(seq);

  const vapidDetails = await (async () => {
    const current = await model.vapidDetails.findOne();

    if (current) return current.get();

    const vapidKeys = webPush.generateVAPIDKeys();

    const vapidDetails = {
      subject,
      ...vapidKeys,
    };

    await model.vapidDetails.create(vapidDetails);

    return vapidDetails;
  })();

  const cache = new Cache(redis);

  const auth = new Auth({ username, password, key: keyToTokens, cache });

  const notify = prepareNotify(cache, model, vapidDetails);

  setChat({ io, auth, notify, model });

  const router = express.Router();

  router.use(api(auth));

  router.use(express.static(path.join(__dirname, frontend)));

  return router;
}

export default function create(options: Options) {
  const router = express.Router();

  prepareSocial(options)
    .then((social) => {
      router.use("/social", social);
    })
    .catch((err) => {
      throw err;
    });

  return router;
}

/**
 * Types
 */

export interface Options {
  username: string;
  password: string;
  keyToTokens: string;
  io: ServerIO;
  seq: Sequelize;
  redis: RedisClient;
}
