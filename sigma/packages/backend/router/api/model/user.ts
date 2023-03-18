import express from "express";
import { Database } from "../../../model";
import { createApiPath, User } from "../../../integration";
import { parseQuery, parseOptions } from "../../../integration/util";
import type { Req, Res, Next } from "./middleware";

const pathUser = createApiPath(User.baseURL);

export default function createUserAPI() {
  const router = express.Router();

  router.post(pathUser.destroy, DestroyUser);
  router.post(pathUser.update, UpdateUser);
  router.post(pathUser.create, CreateUser);
  router.post(pathUser.findAll, FindAll);
  router.post(pathUser.count, CountUser);
  router.post(pathUser.findAndCountAll, FindAndCountAll);

  router.get(pathUser.findAll, GetFindAll);
  router.get(pathUser.findAndCountAll, GetFindAndCountAll);

  return router;
}

export function DestroyUser(req: Req, res: Res, next: Next) {
  Database.connection.user
    .destroy(parseOptions(req.body))
    .then((val) => res.json(val))
    .catch(next);
}

export function UpdateUser(req: Req, res: Res, next: Next) {
  const [data, opt] = req.body;

  Database.connection.user
    .update(data, parseOptions(opt))
    .then(([, users]: unknown[]) => res.json(users))
    .catch(next);
}

export function CreateUser(req: Req, res: Res, next: Next) {
  const [data, opt] = req.body;

  Database.connection.user
    .create(data, parseOptions(opt))
    .then((user) => res.json(user))
    .catch(next);
}

export function FindAll(req: Req, res: Res, next: Next) {
  Database.connection.user
    .findAll(parseOptions(req.body))
    .then((users) => res.json(users))
    .catch(next);
}

export function CountUser(req: Req, res: Res, next: Next) {
  Database.connection.user
    .count(parseOptions(req.body))
    .then((amount) => res.json(amount))
    .catch(next);
}

export function FindAndCountAll(req: Req, res: Res, next: Next) {
  Database.connection.user
    .findAndCountAll(parseOptions(req.body))
    .then((data) => res.json(data))
    .catch(next);
}

export function GetFindAndCountAll(req: Req, res: Res, next: Next) {
  Database.connection.user
    .findAndCountAll(parseQuery(req.query))
    .then((data) => res.json(data))
    .catch(next);
}

export function GetFindAll(req: Req, res: Res, next: Next) {
  Database.connection.user
    .findAll(parseQuery(req.query))
    .then((users) => res.json(users))
    .catch(next);
}
