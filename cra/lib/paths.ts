import path from "path";
import { getCraConfig } from "./project";
import type { PartialPaths as Paths } from "./cra";

export const root = {
  package: path.resolve("package.json"),
  craJson: path.resolve("cra.json"),
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

export function setRoot(root: string): Paths {
  const resolve = (...args: string[]) => path.resolve(root, ...args);

  return {
    appPath: resolve(),
    appBuild: resolve("build"),
    appIndexJs: resolve("src/index.tsx"),
    appPublic: resolve("public"),
    appHtml: resolve("public/index.html"),
    appSrc: resolve("src"),
    appTsConfig: resolve("tsconfig.json"),
    appJsConfig:resolve("jsconfig.json"),
    appTypeDeclarations: resolve("src/react-app-env.d.ts"),
    testsSetup: resolve("src/setupTests.ts"),
    proxySetup:resolve("src/setupProxy.js"),
    swSrc:resolve("src/service-worker.js")
  };
}
