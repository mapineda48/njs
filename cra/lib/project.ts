import fs from "fs-extra";
import { root, project } from "./paths";

import type { PartialPaths } from "./cra";
import type { Options } from "./cli";

export const pckg = fs.readJSONSync(root.package);

export const craJson: CRAJSON = fs.existsSync(root.craJson)
  ? fs.readJSONSync(root.craJson)
  : {};

export function isNextProject() {
  return !!pckg.dependencies["next"];
}

/**
 * Types
 */
export interface CRAJSON {
  main?: string;
  app?: {
    [K: string]: Partial<AppOpt>;
  };
  paths?: PartialPaths;
}

export interface AppOpt extends Options {
  entry: string;
}
