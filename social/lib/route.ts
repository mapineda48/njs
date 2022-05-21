import express from "express";
import helmet from "helmet";
import ms from "ms";
import webPush from "web-push";
import { resoveMod } from "./util";
import createModel, { UUIDV4 } from "./model";
import api from "./api";
import { PATH_GUEST, PATH_API, PATH_SOCIAL } from "./api/type";
import { onError } from "./error/route";
import setSocketSocial from "./socket";
import { JWT } from "./jwt";
import { logError } from "./error/log";
import { ErrorApp, ErrorNotExistMiguel } from "./error/Error";
import setServiceWorkerMiddleware from "./sw";

import type { Sequelize } from "sequelize";
import type { Server as ServerIO } from "socket.io";

/**
 * To avoid a flood of messages, there must be a 10 minute
 * difference between message and message.
 */
const timeLimit = ms("10m");

const frontend = resoveMod("frontend/build");

export function createRouteSocial(config: Options) {
  const route = express.Router();

  createModel(config.seq)
    .then(async function existsMiguel(model) {
      await model.guest.update(
        { isOnline: false, sockets: [] },
        { where: { isOnline: true } }
      );

      const miguel = await model.miguel.findOne();

      if (miguel) {
        await miguel.update({ isOnline: false });
        return { model, privateKey: miguel.getDataValue("privateKey") };
      }

      const { publicKey, privateKey } = webPush.generateVAPIDKeys();

      await model.miguel.create({
        id: UUIDV4,
        isOnline: false,
        lastNotification: 0,
        privateKey,
        publicKey,
        subject: "mailto:example@yourdomain.org",
        lastLoginAttempt: 0,
        loginAttempts: 0,
      });

      return { model, privateKey };
    })
    .then(function notifyGuestToMiguel({ model, privateKey }) {
      route.use(PATH_GUEST, (req, res, next) => {
        next();

        model.subscription
          .findAll()
          .then(async (subs) => {
            if (!subs.length) {
              return;
            }

            const miguel = await model.miguel.findOne();

            if (!miguel) {
              throw new ErrorNotExistMiguel();
            }

            const isOnline = miguel.getDataValue("isOnline");

            if (isOnline) {
              return;
            }

            const lastMessage = miguel.getDataValue("lastNotification");

            const currentTime = Date.now();

            if (lastMessage) {
              const elapsed = currentTime - lastMessage;

              if (elapsed < timeLimit) {
                return;
              }
            }

            const privateKey = miguel.getDataValue("privateKey");
            const publicKey = miguel.getDataValue("publicKey");
            const subject = miguel.getDataValue("subject");

            const data = JSON.stringify({
              title: "Tienes un visitante",
              body: "Saludalo",
            });

            const vapidDetails = {
              privateKey,
              publicKey,
              subject,
            };

            await Promise.all(
              subs.map((sub) =>
                webPush
                  .sendNotification(sub.get(), data, {
                    vapidDetails,
                  })
                  .catch(async (err) => {
                    if (err.statusCode !== 410) {
                      throw err;
                    }

                    await sub.destroy();
                    throw new ErrorApp(
                      "push subscription has unsubscribed or expired"
                    );
                  })
              )
            );

            await miguel.update({ lastNotification: currentTime });
          })
          .catch(logError);
      });

      return { model, privateKey };
    })
    .then(async function onReadyModel({ model, privateKey }) {
      const jwt = new JWT({
        username: config.username,
        password: config.password,
        key: privateKey,
      });

      route.use(
        PATH_GUEST,
        helmet({
          contentSecurityPolicy: {
            useDefaults: true,
            directives: {
              frameAncestors: ["*"],
              //          upgradeInsecureRequests: null
            },
          },
        })
      );

      route.use(PATH_API, api(jwt, model));

      route.use(setServiceWorkerMiddleware());

      route.use(express.static(frontend));

      route.use(onError);

      setSocketSocial(config.io, jwt, model);
    })
    .catch(logError);

  return express.Router().use(PATH_SOCIAL, route);
}

/**
 * Types
 */

export interface Options {
  username: string;
  password: string;
  io: ServerIO;
  seq: Sequelize;
}
