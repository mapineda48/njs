import express from "express";
import apis from "../integration/api";
import path, { join as joinPath } from "path";
import { Next, Req, Res } from "./error";

const src = path.join(__dirname, "../src");

export default async function loadApiHandler() {
  const tasks = await getApis();
  const apis = await Promise.all(tasks);

  const route = express.Router();

  apis.forEach(({ path, handler }) => {
    route.use(path, handler);
  });

  return route;
}

async function getApis() {
  const tasks = apis.map(({ route, baseUrl }) => getApi(route, baseUrl));
  const imports = await Promise.all(tasks);

  return imports.reduce((prev, curr) => [...prev, ...curr], []);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function getApi(route: any, baseUrl: string, apis: Apis = []) {
  const tasks = Object.values(route).map(async (path) => {
    if (!path) {
      return;
    }

    if (!(typeof path === "string")) {
      await getApi(path, baseUrl, apis);
      return;
    }

    const filename = path.replace(baseUrl, "");
    const fn = joinPath(src, filename);

    const mod = await import(fn);

    if (isMethod(mod)) {
      log("method", fn, path);

      
      apis.push({ path, handler: toRequestHandler(mod.default) });
      return;
    }

    if (isOnRequest(mod)) {
      log("handler", fn, path);

      apis.push({
        path: !mod.path ? path : joinPath(path, mod.path),
        handler: mod.onRequest,
      });

      return;
    }

    throw Error(`unsupport module '${fn}'`);
  });

  await Promise.all(tasks);

  return apis;
}

function toRequestHandler(method: Method) {
  return (req: Req, res: Res, next: Next) => {
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
  };
}

export function log(type: string, fn: string, api: string) {
  console.log(`import ${type}`);
  console.log("\t" + fn);
  console.log("\t" + api);
}

function isOnRequest(mod: object): mod is IModuleOnRequest {
  return "onRequest" in mod && typeof mod.onRequest === "function";
}

function isMethod(mod: object): mod is IModule {
  return "default" in mod && typeof mod.default === "function";
}

/**
 * Types
 */

interface IModuleOnRequest {
  path?: string;
  onRequest: (req: Req, res: Res, next: Next) => void;
}

interface IModule {
  default: Method;
}

type Method = (...args: unknown[]) => unknown;

type Api = { path: string; handler: (req: Req, res: Res, next: Next) => void };

type Apis = Api[];
