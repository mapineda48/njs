import express from "express";
import { route as api } from "../integration/agape";
import path from "path";

const basePath = path.join(__dirname, "..");

export function createApi() {
  const route = express.Router();

  const imports = getImports().map(async ({ apiPath, importPath }) => {
    const mod = await import(importPath);

    const { onReq, extPath } = mod;

    if (onReq) {
      console.log(`import request handler: ${importPath}`);
      const path = extPath ? apiPath + extPath : apiPath;

      route.post(path, onReq);
      return;
    }

    const method = mod.default;

    if (!method) {
      return;
    }

    console.log(`import function: ${importPath}`);
    route.post(apiPath, (req, res, next) => {
      let result;

      try {
        result = method(...req.body);
      } catch (error) {
        next(error);
        return;
      }

      if (!(result instanceof Promise)) {
        res.json(result);
        return;
      }

      result.then((val) => res.json(val)).catch(next);
    });
  });

  return Promise.all(imports).then(() => route);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getImports(routeMap: any = api, result: Entries = []) {
  Object.values(routeMap).forEach((apiPath) => {
    if (!apiPath) {
      return;
    }

    if (typeof apiPath === "string") {
      const importPath = apiPath.replace("/api", basePath);

      result.push({ apiPath, importPath });
      return;
    }

    getImports(apiPath, result);
  });

  return result;
}

/**
 * Types
 */
type Entries = { importPath: string; apiPath: string }[];
