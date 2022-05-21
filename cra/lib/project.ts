import fs from "fs-extra";
import { root, project } from "./paths";

let pckg: any = null;

let craJson: CRAJSON | null = null;

export function getPackage() {
  if (!pckg) {
    const data = fs.readJSONSync(root.package);
    pckg = data;
  }

  return pckg;
}

export function getCraConfig() {
  if (!craJson) {
    const data: CRAJSON = fs.existsSync(root.craJson)
      ? fs.readJSONSync(root.craJson)
      : {};

    craJson = data;

    return data;
  }

  return craJson;
}

export function isNextProject() {
  const pckg = getPackage();

  return !!pckg.dependencies["next"];
}

/**
 * Types
 */
export interface CRAJSON {
  main?: string;
  app?: {
    [K: string]: Partial<Options>;
  };
  root?: string;
  ModuleScopePlugin?: "off";
}

export interface Options {
  entry: string;
  template: string;
}
