/* eslint-disable @typescript-eslint/no-explicit-any */
import { glob } from "glob";
import path, { join } from "path";
import express from "express";
import cls from "cls-hooked";
import { verify as agape } from "../auth/agape";
import initModels, { baseUrl as model } from "./model";
import { toJsonApi } from "./util";
import onError from "./error/route";

const src = path.resolve("src");

export default async function main() {
  const route = express.Router();

  route.use("/api/agape", agape);
  route.use(model, agape);

  await loadApi(route);

  route.use(onError);

  return route;
}

//
// Load all method
//
const ext = path.extname(__filename);

async function loadApi(router: express.Router) {
  let api: any;

  api = await glob(`**/*${ext}`, { cwd: src });
  api = api.filter(skipApi);

  api = await Promise.all(
    api.map(async (file: string) => [file, await import(path.join(src, file))])
  );

  api = api.filter(
    ([, mod]: any) =>
      ("default" in mod && typeof mod.default === "function") ||
      ("onReq" in mod && typeof mod.onReq === "function")
  );

  //console.log(api);

  api = api.map(([file, mod]: any) => {
    const path = "/api/" + file.replace(ext, "");

    if ("default" in mod) {
      router.post(path, toHandlerReq(mod.default));
    } else {
      router.post(join(path, mod.path ?? ""), mod.onReq);
    }

    return [file.replace(ext, "").split("/"), path];
  });

  api = toJsonApi(api);

  api.model = initModels(router);

  console.log(api);

  router.get("/api", (req, res) => res.json(api));
}

function skipApi(file: string) {
  return !file.startsWith("rpc") && !file.startsWith("model");
}

export const session = cls.createNamespace("api");

function toHandlerReq(method: (...args: unknown[]) => unknown) {
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

/**
 * Types
 */

export type Next = express.NextFunction;

export type Res = express.Response;

export type Req = express.Request;
