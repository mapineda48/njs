import path from "path";
import { getCraConfig } from "./project";

export const root = {
  package: resolve("package.json"),
  craJson: resolve("cra.json"),
};

export const project = {
  appPublic: resolveMod("app/public"),
  appHtml: resolveMod("app/public/index.html"),
};

export { path };

export function resolveMod(...args: string[]) {
  return path.join(__dirname, "..", ...args);
}

export function resolve(...args: string[]) {
  return path.resolve(...args);
}

export function resolveApp(...paths: string[]) {
  const craJson = getCraConfig();

  if (!craJson.root) return resolve(...paths);

  return path.resolve(craJson.root, ...paths);
}
