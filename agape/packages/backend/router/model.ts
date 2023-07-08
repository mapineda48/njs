import express from "express";
import { ModelStatic } from "sequelize";
import { parseOperator as parseOptions } from "../integration/model/util/where";
import { routes } from "../integration/model";
import { Database } from "../model";

export function createApiModel(path: string, model: ModelStatic<any>) {
  const router = express.Router();

  //Delete Record
  router.delete(path, (req, res, next) => {
    model
      .destroy(parseOptions(req.body))
      .then((val) => res.json(val))
      .catch(next);
  });

  // Update
  router.put(path, (req, res, next) => {
    const [data, opt] = req.body;

    model
      .update(data, parseOptions(opt))
      .then(([, users]: unknown[]) => res.json(users))
      .catch(next);
  });

  // Create
  router.post(path, (req, res, next) => {
    model
      .create(req.body)
      .then((user) => res.json(user))
      .catch(next);
  });

  // FindAll
  router.post(`${path}/findAll`, (req, res, next) => {
    model
      .findAll(parseOptions(req.body))
      .then((users) => res.json(users))
      .catch(next);
  });

  // Count
  router.post(`${path}/count`, (req, res, next) => {
    model
      .count(parseOptions(req.body))
      .then((amount) => res.json(amount))
      .catch(next);
  });

  // FindAndCount
  router.post(`${path}/findAndCountAll`, (req, res, next) => {
    model
      .findAndCountAll(parseOptions(req.body))
      .then((data) => res.json(data))
      .catch(next);
  });

  return router;
}

export function createApiModels() {
  const router = express.Router();

  const seq = Database.connection.sequelize;

  routes.forEach(({ NameModel, Path }) => {
    router.use(createApiModel(Path, seq.models[NameModel]));
  });

  return router;
}
