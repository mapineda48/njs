import fs from "fs-extra";
import { cra } from "./cra";
import { resolveApp } from "./paths";
const ModuleScopePlugin = require("react-dev-utils/ModuleScopePlugin");

/**
 * Okay, it goes without saying that this is very experimental,
 * so use it at your own risk.
 * https://github.com/facebook/create-react-app/blob/b45ae3c9caf10174d53ced1cad01a272d164f8de/packages/react-scripts/config/webpack.config.js#L314
 */
export function removeModuleScopePlugin() {
  cra.webpack((factory) => {
    return (env) => {
      const config = factory(env);

      if (config.resolve?.plugins) {
        config.resolve.plugins = config.resolve.plugins.filter(
          (plugin) => !(plugin instanceof ModuleScopePlugin)
        );
      }

      return config;
    };
  });
}

function readTsConfigFile(file: string) {
  const ts = require("typescript");

  return ts.readConfigFile(file, ts.sys.readFile).config;
}

export function enabledTsPaths() {
  const { appTsConfig } = cra.paths();

  if (!fs.existsSync(appTsConfig)) return;

  const {
    compilerOptions: { baseUrl, paths },
  } = readTsConfigFile(appTsConfig);

  if (!baseUrl || !paths) return;

  /**
   * keep only baseUrl src,
   * could remove it but I think it's better that way.
   */
  cra.modules();

  /**
   * verify the typescript configuration with react-scripts
   */
  const verifyTypeScriptSetup = cra.verifyTypeScriptSetup();

  verifyTypeScriptSetup();

  /**
   * we load the configuration again in case after the
   * verification changes were applied
   */
  const config = readTsConfigFile(appTsConfig);

  config.compilerOptions.paths = paths;

  /**
   * Verification removes routes, we add them again
   */
  fs.writeJSONSync(appTsConfig, config, { spaces: 2 });

  /**
   * We must add these routes to webpack as aliases,
   * if this is omitted the build will fail.
   */
  const toWebpack = (val: string) => val.replace("/*", "");
  const alias = Object.fromEntries(
    Object.entries(paths).map(([key, [path]]: any) => [
      toWebpack(key),
      resolveApp(baseUrl, toWebpack(path)),
    ])
  );

  cra.webpack((factory) => {
    return (env) => {
      const config = factory(env);

      if (config.resolve?.alias) {
        config.resolve.alias = { ...config.resolve.alias, ...alias };
      }

      return config;
    };
  });

  /**
   * Warning disabled typescript checking...
   */
  cra.verifyTypeScriptSetup((cb) => {
    return () => {};
  });
}
