import { Router } from "express";
import { Model, ModelStatic, Op as OpSeq } from "sequelize";
import Database, { apis } from "../../models";
import { Op as OpApi } from "@api/models";
import { delimiter } from "@util/models/toMap";
import RouteError from "./error/RouteError";
import path from "path";
import lodash from "lodash";

export const baseUrl = "/api/models";

export default function initModels(router: Router) {
  const coll = apis.map((modelName) => {
    const keys = modelName.split(delimiter);
    const api = path.join(baseUrl, ...keys);
    const model = Database.models[modelName];

    initModel(router, api, model);

    return [keys, api];
  });

  return lodash.reduce(
    coll,
    (acc, [path, value]) => {
      lodash.set(acc, path, value);
      return acc;
    },
    {}
  );
}

export function initModel(router: Router, baseUrl: string, model: IModel) {
  //Delete Record
  router.delete(baseUrl, (req, res, next) => {
    const { where } = req.body;

    if (!where || !Object.keys(where).length) {
      throw new RouteError(400, "missing filter");
    }

    model
      .destroy(parseOperator(req.body))
      .then((val) => res.json(val))
      .catch(next);
  });

  // Update
  router.put(baseUrl, (req, res, next) => {
    const [data, opt] = req.body;

    const { where } = opt;

    if (!where || !Object.keys(where).length) {
      throw new RouteError(400, "missing filter");
    }

    opt.returning = true;

    model
      .update(data, parseOperator(opt))
      .then(([, users]: unknown[]) => res.json(users))
      .catch(next);
  });

  // Create
  router.post(baseUrl, (req, res, next) => {
    model
      .create(req.body)
      .then((user) => res.json(user))
      .catch(next);
  });

  // FindAll
  router.post(`${baseUrl}/findAll`, (req, res, next) => {
    model
      .findAll(parseOperator(req.body))
      .then((users) => res.json(users))
      .catch(next);
  });

  // Count
  router.post(`${baseUrl}/count`, (req, res, next) => {
    model
      .count(parseOperator(req.body))
      .then((amount) => res.json(amount))
      .catch(next);
  });

  // FindAndCount
  router.post(`${baseUrl}/findAndCountAll`, (req, res, next) => {
    model
      .findAndCountAll(parseOperator(req.body))
      .then((data) => res.json(data))
      .catch(next);
  });
}

const Op = Object.fromEntries(
  Object.entries(OpSeq).map(([key, symbl]) => [(OpApi as any)[key], symbl])
);

/**
 * https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#applying-where-clauses
 */
export function parseOperator(where: any): any {
  if (!where || !(typeof where === "object")) {
    return where;
  }

  if (Array.isArray(where)) {
    return where.map(parseOperator);
  }

  return Object.fromEntries(
    Object.entries(where).map(([key, val]) => {
      if (Op[key]) {
        return [Op[key], val];
      }

      return [key, parseOperator(val)];
    })
  );
}
/**
 * Types
 */
type IModel = ModelStatic<Model<object>>;
