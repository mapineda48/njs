import express from "express";
import ms from "ms";
import { UUIDV4 } from "../model";
import { PATH_LOGIN, PATH_GUEST } from "./type";
import { ErrorNotExistMiguel, ErrorUnauthorizedLogin } from "../error/Error";

import type { Model } from "../model";
import type { JWT } from "../jwt";

const MAX_ATTEMPS = 3;
const TIME_BETWEEN_ATTEMP = ms("12h");

export default function login(jwt: JWT, model: Model) {
  const route = express.Router();

  route.get(PATH_LOGIN, (req, res, next) => {
    const token: any = req.query.token;

    jwt
      .verify(token)
      .then((isMiguel) => res.json(isMiguel))
      .catch(next);
  });

  route.post(PATH_LOGIN, (req, res, next) => {
    model.miguel
      .findOne()
      .then(async (miguel) => {
        if (!miguel) {
          throw new ErrorNotExistMiguel();
        }

        const loginAttempt = miguel.getDataValue("loginAttempts");

        const lastLoginAttempt = miguel.getDataValue("lastLoginAttempt");

        console.log({ loginAttempt, lastLoginAttempt });

        if (loginAttempt >= MAX_ATTEMPS) {
          const currentTime = Date.now();

          const elapsed = currentTime - lastLoginAttempt;

          console.log({ elapsed, TIME_BETWEEN_ATTEMP });

          if (elapsed < TIME_BETWEEN_ATTEMP) {
            throw new ErrorUnauthorizedLogin();
          }
        }

        try {
          const { username, password } = req.body;

          const token = await jwt.login(username, password);

          res.json(token);
        } catch (error) {
          miguel.update({
            loginAttempts: loginAttempt === MAX_ATTEMPS ? 0 : loginAttempt + 1,
            lastLoginAttempt: Date.now(),
          });
          throw error;
        }
      })
      .catch(next);
  });

  route.get(PATH_GUEST, (req, res, next) => {
    const id: any = req.query.id;

    model.guest
      .count({ where: { id } })
      .then((exists) => {
        res.json(Boolean(exists));
      })
      .catch(next);
  });

  route.post(PATH_GUEST, (req, res, next) => {
    model.guest
      .create({
        id: UUIDV4,
        origin: "",
        demo: "",
        fullName: "Guest-" + Date.now(),
        address: "",
        userAgent: "",
        isOnline: false,
        sockets: [],
      })
      .then((guest) => {
        res.json(guest.getDataValue("id"));
      })
      .catch(next);
  });

  return route;
}
