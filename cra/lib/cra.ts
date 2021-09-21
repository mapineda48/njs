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

const cbPaths: ArgPaths[] = [];
const cbWebpack: ArgConfig[] = [];

/**
 * If you are wondering why I apply changes this way, 
 * during testing keep in mind that all changes need to 
 * be applied to paths first, as webpack.config depends on it.
 */
function applyConfig() {
  cbPaths.forEach((cb) => {
    if (typeof cb === "function") {
      setInModule(src.paths, cb);
    } else {
      setInModule(src.paths, (paths) => {
        return { ...paths, ...cb };
      });
    }
  });

  cbWebpack.forEach((cb) => {
    setInModule(src.config, (factory) => cb(factory, require(src.paths)));
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

  webpack(cb: (factory: FactoryConfig, paths: Paths) => FactoryConfig) {
    cbWebpack.push(cb);
    return cra;
  },

  paths(cb: PartialPaths | ((paths: Paths) => Paths)) {
    cbPaths.push(cb);
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
type ArgPaths = PartialPaths | ((paths: Paths) => Paths);

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
