import path from "path";
import type { PartialPaths as Paths } from "./cra";

export const root = {
  package: path.resolve("package.json"),
  craJson: path.resolve("cra.json"),
};

export const project = {
  appPublic: resolve("app/public"),
  appHtml: resolve("app/public/index.html"),
};

function resolve(...args: string[]) {
  return path.join(__dirname, "..", ...args);
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
    appTypeDeclarations: resolve("src/react-app-env.d.ts"),
    testsSetup: resolve("src/setupTests.ts"),
  };
}
