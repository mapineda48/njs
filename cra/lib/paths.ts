import path from "path";
import { getCraConfig } from "./project";

export const root = {
  package: resolveRoot("package.json"),
  craJson: resolveRoot("cra.json"),
};

export const project = {
  appPublic: resolveMod("app/public"),
  appHtml: resolveMod("app/public/index.html"),
};

export function resolveMod(...args: string[]) {
  return path.join(__dirname, "..", ...args);
}

export function resolveRoot(...args: string[]) {
  return path.resolve(...args);
}

export function resolveApp(...paths: string[]) {
  const craJson = getCraConfig();

  if (!craJson.root) return resolveRoot(...paths);

  return path.resolve(craJson.root, ...paths);
}