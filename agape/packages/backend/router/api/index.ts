import { glob } from "glob";
import path from "path";
import express from "express";
import cls from "cls-hooked";
import { Next, Req, Res } from "../error";

const index = path.basename(__filename);
const ext = path.extname(__filename);
const pattern = `**/*${ext}`;
const regExp = new RegExp(`${ext}$`);

export const baseUrl = "/api";

export default async function api(route: express.Router) {
  const handlers = await importApis();

  handlers.forEach(({ path, fn }) => route.post(path, fn));
}

// export async function importApi() {
//   const res = await glob(pattern, { cwd: __dirname });
//   const basenames = res.filter((path) => path !== index);

//   const tasks = basenames.map(async (basename) => ({
//     keys: parsePath(basename).split("/").filter(Boolean),
//     path: path.join(baseUrl, parsePath(basename)),
//     mod: await import(path.join(__dirname, basename)),
//   }));

//   const modules = await Promise.all(tasks);

//   const handlers = modules
//     .filter(({ mod }) => isSupport(mod))
//     .map(toHandler)
//     .flat();

//   const routes: Route[] = [];
//   const client: Json = {};

//   handlers.forEach(({ keys, path, fn }) => {
//     routes.push({ path, fn });
//     toJson(keys, path, client);
//   });

//   if (isDev) {
//     await fs.outputJSON(pathJson, client);
//   }

//   return routes;
// }

export async function importApis() {
  const res = await glob(pattern, { cwd: __dirname });
  const basenames = res.filter((path) => path !== index);

  const tasks = basenames.map(async (basename) => ({
    filename: path.join(__dirname, basename),
    keys: parsePath(basename).split("/").filter(Boolean),
    path: path.join(baseUrl, parsePath(basename)),
    mod: await import(path.join(__dirname, basename)),
  }));

  const results = await Promise.all(tasks);

  return results
    .filter(({ mod }) => isSupport(mod))
    .map(toHandler)
    .flat();
}

function toHandler(data: IImport) {
  const { keys, path: route, mod, filename } = data;

  if (isOnRequest(mod)) {
    return {
      keys,
      path: toBaseName(path.join(route, mod.path ?? "")),
      fn: mod.onRequest,
      filename
    };
  }

  if (!isMethod(mod)) {
    throw new Error("unsupport module " + route);
  }

  if (typeof mod.default === "function") {
    return {
      keys,
      path: toBaseName(route),
      fn: toHandlerReq(mod.default),
      filename
    };
  }

  return Object.entries(mod.default).map(([field, fn]: [string, IMethod]) => {
    return {
      keys: [...keys, field],
      path: toBaseName(path.join(route, "_", field)),
      fn: toHandlerReq(fn),
      filename
    };
  });
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

function isOnRequest(mod: object): mod is IRequest {
  return "onRequest" in mod && typeof mod.onRequest === "function";
}

function isMethod(mod: object): mod is IModule {
  return (
    "default" in mod &&
    (typeof mod.default === "object" || typeof mod.default === "function")
  );
}

function isSupport(mod: object) {
  return "onRequest" in mod || "default" in mod;
}

function parsePath(value: string) {
  return value.replace(index, "").replace(regExp, "");
}

export function toBaseName(modelName: string) {
  return modelName
    .replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2") // Inserta guiones antes de las letras mayúsculas
    .toLowerCase() // Convierte todo a minúsculas
    .replace(/^-/, ""); // Elimina el guión al inicio si existe
}

//importApi().catch(console.error);

/**
 * Types
 */
interface IImport {
  keys: string[];
  mod: object;
  path: string;
  filename: string;
}

interface IRequest {
  path?: string;
  onRequest: (req: Req, res: Res, next: Next) => void;
}

interface IModule {
  default: IMethod | IDefault;
}

type IDefault = {
  [K: string]: IMethod;
};

type IMethod = (...args: unknown[]) => unknown;
