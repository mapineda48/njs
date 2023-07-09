import express from "express";
import { route as routeApi, baseApi } from "../integration/agape";
import path from "path";

const agape = path.join(__dirname, "../agape");

export function createApi() {
  const route = express.Router();

  const imports = getImports().map(async (path) => {
    const mod = await import(path.fnPath);

    if (!mod.onReq) {
      setMethod(route, mod.default, path);
      return;
    }

    setReqHandler(route, mod, path);
  });

  return Promise.all(imports).then(() => route);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setReqHandler(route: express.Router, mod: any, path: Entrie) {
  const { onReq, extPath } = mod;
  const { fnPath, apiPath } = path;

  console.log(`import request handler: ${fnPath}`);
  const custmPath = extPath ? apiPath + extPath : apiPath;

  route.post(custmPath, onReq);
  return;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setMethod(route: express.Router, method: any, pat: Entrie) {
  const { fnPath, apiPath } = pat;

  if (!method) {
    return;
  }

  console.log(`import function: ${fnPath}`);
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
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getImports(routeMap: any = routeApi, result: Entries = []) {
  Object.values(routeMap).forEach((apiPath) => {
    if (!apiPath) {
      return;
    }

    if (!(typeof apiPath === "string")) {
      getImports(apiPath, result);
      return;
    }

    const relativePath = apiPath.replace(baseApi, "");
    const fnPath = path.join(agape, relativePath);

    result.push({ apiPath, fnPath });
  });

  return result;
}

/**
 * Types
 */
type Entrie = { fnPath: string; apiPath: string };

type Entries = Entrie[];
