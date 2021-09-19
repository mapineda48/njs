import type { Configuration } from "webpack";

/**
 * source react-scripts
 */
export const src = {
  env: require.resolve("react-scripts/config/env"),
  paths: require.resolve("react-scripts/config/paths"),
  start: require.resolve("react-scripts/scripts/start"),
  build: require.resolve("react-scripts/scripts/build"),
  config: require.resolve("react-scripts/config/webpack.config"),
};

loadEnv();

export const cra = {
  start() {
    require(src.start);
  },
  build() {
    require(src.build);
  },

  config(cb: (factory: FactoryConfig, paths: Paths) => FactoryConfig) {
    setInModule(src.config, (factory) => cb(factory, require(src.paths)));
    return cra;
  },

  paths(cb: PartialPaths | ((paths: Paths) => Paths)) {
    if (typeof cb === "function") {
      setInModule(src.paths, cb);
    } else {
      setInModule(src.paths, (paths) => {
        return { ...paths, ...cb };
      });
    }

    return cra;
  },
};

/**
 * Important!!!
 * https://github.com/facebook/create-react-app/blob/025f2739ceb459c79a281ddc6e60d7fd7322ca24/packages/react-scripts/config/env.js#L15
 */
function loadEnv() {
  (process as any).env.NODE_ENV = process.env.NODE_ENV || "production";
  require(src.env);
}

function setInModule<T = any>(key: string, cb: (val: T) => T) {
  const _export: any = require(key);

  const nodeModule = require.cache[key];

  delete require.cache[key];

  require.cache[key] = {
    ...nodeModule,
    exports: cb(_export),
  };
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
}
