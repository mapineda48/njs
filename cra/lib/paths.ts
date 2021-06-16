import path from "path";
import fs from "fs-extra";
import Error from "./error";

import type { Options, CliOptions } from "./cli";
import type { PathsArg } from "./cra";

/**
 * Read config from root project react.json
 */
const file = path.resolve("react.json");

const existsConfig = fs.existsSync(file);

const config: Config = existsConfig ? fs.readJSONSync(file) : {};

export function prepareBuild(app: string, cli: CliOptions) {
  if (!cli.allApps) {
    return {
      ...prepareStart(app),
      ...combineConfig(app, cli),
    } as PathsArg;
  }

  if (!config?.app) {
    throw new Error("missing file react.json on root project.");
  }

  const apps = Object.entries(config.app).map(([app, opt]) =>
    requireApp(app, opt)
  );

  return [apps, cli.url] as [App[], string];
}

export function requireApp(app: string, opt: AppOpt): App {
  const keys = ["entry", "output", "url"];

  keys.forEach(function checkApp(key) {
    if ((opt as any)?.[key]) return;
    throw new Error(`missing field "${key}" in ${app} config`);
  });

  return opt as any;
}

export function combineConfig(arg = config.default, cli: CliOptions): PathsArg {
  const existsInLine = cli.output || cli.url;

  const app = config?.app?.[arg];

  if (!app && !existsInLine) return {};

  const nextOpt: PathsArg = {};

  if (cli?.output) {
    nextOpt.appBuild = path.resolve(cli.output);
  } else if (app?.output) {
    nextOpt.appBuild = path.resolve(app.output);
  }

  if (cli?.url) {
    nextOpt.publicUrlOrPath = cli.url;
  } else if (app?.url) {
    nextOpt.publicUrlOrPath = app.url;
  }

  return nextOpt;
}

/**
 * parse start paths
 * @param opt Options
 */
export function prepareStart(app: string): PathsArg {
  let entry: string | undefined | false;

  entry = !app && config?.app?.[config?.default]?.entry;

  if (entry) {
    return {
      appIndexJs: path.resolve(entry),
    };
  }

  if (!app) {
    return {};
  }

  entry = config?.app?.[app]?.entry;

  if (entry) {
    return {
      appIndexJs: path.resolve(entry),
    };
  }

  return { appIndexJs: path.resolve(app) };
}

function isString(val: any): val is string {
  return typeof val === "string";
}

/**
 * Types
 */
export interface Config {
  default: string;
  app: {
    [K: string]: AppOpt;
  };
}

export type App = Required<AppOpt>;

export interface AppOpt extends Options {
  entry?: string;
}
