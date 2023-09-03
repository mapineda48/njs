import { glob } from "glob";
import path from "path";
import express from "express";
import cls from "cls-hooked";
import { Next, Req, Res } from "../error";
import { ModelStatic } from "sequelize";
import { parseOperator as parseOptions } from "../../api/model/util/where";
import { route as model } from "../../api/model";
import Database from "../../model";
import AppError from "../../error/AppError";

/**
 * Load Api
 */
const index = path.basename(__filename);
const ext = path.extname(__filename);
const pattern = `**/*${ext}`;

export default async function api(route: express.Router) {
  Object.entries(model).forEach(([modelName, path]) => {
    route.use(initModel(path, Database.models[modelName]));
  })

  const handlers = await importApis();

  handlers.forEach(({ path, fn }) => route.post(path, fn));
}

export async function importApis() {
  const res = await glob(pattern, { cwd: __dirname });
  const basenames = res.filter((path) => path !== index);

  const tasks = basenames.map(async (basename) => ({
    path: path.join(__dirname, basename),
    mod: await import(path.join(__dirname, basename)),
  }));

  const results = await Promise.all(tasks);

  return results
    .filter(({ mod }) => isMethod(mod))
    .map(toHandler)
    .flat();
}

function toHandler(data: IImport) {
  const { mod, path } = data;

  const fn = mod.onApi ? toHandlerReq(mod.onApi) : mod.onReq;

  if (!fn) {
    throw new Error("unsupport module" + path);
  }

  console.log(`load api\n\tfrom: ${path}\n\tto: ${mod.path}`);

  return {
    path: mod.path,
    fn,
  };
}

export const session = cls.createNamespace("api");

function toHandlerReq(method: IMethod) {
  return function onReq(req: Req, res: Res, next: Next) {
    session.run(() => {
      session.set("userAgent", req.headers["user-agent"] ?? "");

      let result;

      try {
        result = method(...req.body);
      } catch (error) {
        next(error);
        return;
      }

      if (result instanceof Promise) {
        result.then((val) => res.json(val)).catch(next);
        return;
      }

      res.json(result);
    });
  };
}

function isMethod(mod: object): mod is IApiModule {
  return (
    "path" in mod &&
    typeof mod.path === "string" &&
    (("onApi" in mod && typeof mod.onApi === "function") ||
      ("onReq" in mod && typeof mod.onReq === "function"))
  );
}

export function toBaseName(modelName: string) {
  return modelName
    .replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2") // Inserta guiones antes de las letras mayúsculas
    .toLowerCase() // Convierte todo a minúsculas
    .replace(/^-/, ""); // Elimina el guión al inicio si existe
}



/**
 * Models
 */

export function initModel(path: string, model: ModelStatic<any>) {
  const router = express.Router();

  //Delete Record
  router.delete(path, (req, res, next) => {
    const { where } = req.body;

    if (!where || !Object.keys(where).length) {
      throw new AppError(400, "missing filter");
    }

    model
      .destroy(parseOptions(req.body))
      .then((val) => res.json(val))
      .catch(next);
  });

  // Update
  router.put(path, (req, res, next) => {
    const [data, opt] = req.body;

    const { where } = opt;

    if (!where || !Object.keys(where).length) {
      throw new AppError(400, "missing filter");
    }

    opt.returning = true;

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


/**
 * Types
 */
interface IImport {
  mod: IApiModule;
  path: string;
}

interface IApiModule {
  path: string;
  onApi?: IMethod;
  onReq?: (req: Req, res: Res, next: Next) => void;
}

type IMethod = (...args: unknown[]) => unknown;
