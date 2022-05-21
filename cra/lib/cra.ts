import { setInCache } from "mp48-util/lib/node";
import { resolve } from "./paths";
import type { Configuration } from "webpack";

/**
 * source react-scripts
 */
export const src = {
  env: require.resolve("react-scripts/config/env"),
  paths: require.resolve("react-scripts/config/paths"),
  start: require.resolve("react-scripts/scripts/start"),
  build: require.resolve("react-scripts/scripts/build"),
  test: require.resolve("react-scripts/scripts/test"),
  config: require.resolve("react-scripts/config/webpack.config"),
  modules: require.resolve("react-scripts/config/modules"),
  verifyTypeScriptSetup: require.resolve(
    "react-scripts/scripts/utils/verifyTypeScriptSetup"
  ),
};

loadEnv();

const cbPaths: ((paths: Paths) => Paths)[] = [];
const cbWebpack: ArgConfig[] = [];

/**
 * If you are wondering why I apply changes this way,
 * during testing keep in mind that all changes need to
 * be applied to paths first, as webpack.config depends on it.
 */
function applyConfig() {
  cbPaths.forEach((cb) => {
    setInCache(src.paths, cb);
  });

  cbWebpack.forEach((cb) => {
    setInCache(src.config, (factory) => cb(factory, require(src.paths)));
  });
}

export const cra = {
  start() {
    applyConfig();
    require(src.start);
  },
  build() {
    applyConfig();
    require(src.build);
  },
  test() {
    applyConfig();
    require(src.test);
  },

  webpack(cb: (factory: FactoryConfig, paths: Paths) => FactoryConfig) {
    cbWebpack.push(cb);
    return cra;
  },

  modules() {
    require(src.modules);
  },

  paths: modPaths,
  verifyTypeScriptSetup,
  root: setRoot,
};

function setRoot(root: string) {
  const set = (...args: string[]) => resolve(root, ...args);

  setInCache<Paths>(src.paths, (paths) => {
    return {
      ...paths,
      appPath: set(),
      appBuild: set("build"),
      appIndexJs: set("src/index.tsx"),
      appPublic: set("public"),
      appHtml: set("public/index.html"),
      appSrc: set("src"),
      appTsConfig: set("tsconfig.json"),
      appJsConfig: set("jsconfig.json"),
      appTypeDeclarations: set("src/react-app-env.d.ts"),
      testsSetup: set("src/setupTests.ts"),
      proxySetup: set("src/setupProxy.js"),
      swSrc: set("src/service-worker.js"),
    };
  });
}

function verifyTypeScriptSetup(cb: (cb: () => void) => () => void): void;
function verifyTypeScriptSetup(): () => void;
function verifyTypeScriptSetup(cb?: any) {
  if (!cb) return require(src.verifyTypeScriptSetup);

  setInCache(src.verifyTypeScriptSetup, cb);
}

function modPaths(): Paths;
function modPaths(cb: (paths: Paths) => Paths): void;
function modPaths(paths: PartialPaths): void;
function modPaths(val?: any) {
  if (!val) return require(src.paths);

  if (typeof val === "function") {
    cbPaths.push(val);
  } else {
    cbPaths.push((paths) => {
      return { ...paths, ...val };
    });
  }
}

/**
 * Important!!!
 * https://github.com/facebook/create-react-app/blob/025f2739ceb459c79a281ddc6e60d7fd7322ca24/packages/react-scripts/config/env.js#L15
 */
function loadEnv() {
  (process as any).env.NODE_ENV = process.env.NODE_ENV || "production";
  require(src.env);
}

/**
 * Types
 */
export type Env = Configuration["mode"];

type ArgConfig = (factory: FactoryConfig, paths: Paths) => FactoryConfig;

export type FactoryConfig = (env: Env) => Configuration;

export type PartialPaths = Partial<Paths>;

export interface Paths {
  dotenv: string;
  appPath: string;
  appBuild: string;
  appPublic: string;
  appHtml: string;
  appIndexJs: string;
  appPackageJson: string;
  appSrc: string;
  appTsConfig: string;
  appJsConfig: string;
  yarnLockFile: string;
  testsSetup: string;
  proxySetup: string;
  appNodeModules: string;
  publicUrlOrPath: string;
  ownPath: string;
  ownNodeModules: string;
  appTypeDeclarations: string;
  ownTypeDeclarations: string;
  moduleFileExtensions: string[];
  swSrc: string;
}
