import path from "path-browserify";
import history from "history/browser";
import RouteExp from "./RouteExp";

/**
 * https://github.com/remix-run/history/tree/3e9dab413f4eda8d6bce565388c5ddb7aeff9f7e/docs
 */

export { history };

/**
 *
 */
export function parsePath(opt: ParsePath) {
  const { parent = "", routes } = opt;

  const pathname = history.location.pathname;

  const chunk = pathname.replace(parent, "");

  const route = routes.find((route) => route.test(chunk));

  console.log({ opt, pathname, chunk, route });

  if (!route) {
    return {
      pathname,
      chunk,
      param: {},
    };
  }

  return {
    pathname,
    chunk,
    pattern: route.pattern,
    param: extractParams(chunk, route.pattern),
  };
}

export function extractParams(pathname: string, pattern: string): Param {
  const keys = pattern.split("/");

  const values = pathname.split("/");

  const entries = keys
    .map((key, index) => [key, values[index]])
    .filter(([key]) => key.includes(":"))
    .map(([key, value]) => [key.replace(":", ""), value]);

  return Object.fromEntries(entries);
}

export function pathJoin(baseUrl: string, ...paths: string[]) {
  if (paths.includes(".*")) {
    return baseUrl + ".*";
  }

  const pipe = paths.filter(Boolean);

  return path.join(baseUrl, ...pipe);
}

/**
 * Types
 */

export type MatchRoute = ReturnType<typeof parsePath>;

export interface ParsePath {
  parent?: string | RegExp;
  routes: Routes;
}

export type Routes = RouteExp[];

export type Param = {
  [K: string]: string;
};
