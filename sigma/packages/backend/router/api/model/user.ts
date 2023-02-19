import express from "express";
import { Database } from "../../../model";
import { apiPath } from "../../../integration";
import { createModelApiPath } from "../../../integration";
import type { Req, Res, Next, ReqPut } from "./middleware";
import type { Data as UserData } from "../../../model/user/type";

const pathUser = createModelApiPath(apiPath.protected.model.user);

export default function createUserAPI() {
  const router = express.Router();

  router.delete(pathUser.destroy, DestroyUser);
  router.put(pathUser.update, UpdateUser);
  router.post(pathUser.create, CreateUser);
  router.get(pathUser.search, FindAll);
  router.get(pathUser.count, CountUser);
  router.get(pathUser.findAndCountAll, FindAndCountAll);

  return router;
}

export function DestroyUser(req: Req, res: Res, next: Next) {
  Database.connection.user
    .destroy(req.query)
    .then((val) => res.json(val))
    .catch(next);
}

export function UpdateUser(req: ReqPut<UserData>, res: Res, next: Next) {
  Database.connection.user
    .update(req.body, req.query)
    .then(([, users]: unknown[]) => res.json(users))
    .catch(next);
}

export function CreateUser(req: Req, res: Res, next: Next) {
  Database.connection.user
    .create(req.body)
    .then((user) => res.json(user))
    .catch(next);
}

export function FindAll(req: Req, res: Res, next: Next) {
  Database.connection.user
    .findAll(req.query)
    .then((users) => res.json(users))
    .catch(next);
}

export function CountUser(req: Req, res: Res, next: Next) {
  Database.connection.user
    .count(req.query)
    .then((amount) => res.json(amount))
    .catch(next);
}

export function FindAndCountAll(req: Req, res: Res, next: Next) {
  Database.connection.user
    .findAndCountAll(req.query)
    .then((data) => res.json(data))
    .catch(next);
}
