import express from "express";
import { UUIDV4 } from "../model";
import { PATH_LOGIN, PATH_GUEST } from "./type";

import type { Model } from "../model";
import type { JWT } from "../jwt";

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
    const { username, password } = req.body;

    jwt
      .login(username, password)
      .then((token) => {
        res.json(token);
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
