import fs from "fs-extra";
import ManifestPlugin from "webpack-manifest-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { cra } from "./cra";
import { resolveApp } from "./paths";
import { getCraConfig } from "./project";
const ModuleScopePlugin = require("react-dev-utils/ModuleScopePlugin");

import type { Options } from "./project";
import type { Entry, Plugin } from "webpack";

export function prepareApps(publicPath = "") {
  /**
   * if index js is not found, the script compilation will finish,
   * set this index, it will not be included in the package but it will
   * prevent the script from finishing.
   * https://github.com/facebook/create-react-app/blob/b45ae3c9caf10174d53ced1cad01a272d164f8de/packages/react-scripts/scripts/build.js#L59
   */
  cra.paths({ appIndexJs: __filename });

  /**
   * Set Webpack config to multiapp
   */
  cra.webpack((get, paths) => {
    return (env) => {
      const config = get(env);

      const entry: Entry = {};

      const plugins = removeUnnecessaryPlug(config.plugins);

      /**
       * these html documents result at the end of the compilation,
       * each one of them will be verified to try to avoid
       * that they are overwritten
       */
      const htmls: string[] = [];

      const settings = getSettings();

      if (!settings || !settings.length) {
        throw new Error("no found apps");
      }

      settings.forEach((app, index) => {
        let filename = "";

        const template = app.template ? resolveApp(app.template) : "";

        if (template) {
          const inPublic = template.includes(paths.appPublic);

          if (!inPublic) {
            throw new Error("html template must be in folder public");
          }

          filename = template;
          filename = filename.replace(paths.appPublic, paths.appBuild);
        } else {
          filename = app.entry.replace(/\.(js|mjs|jsx|ts|tsx)$/, ".html");
          filename = resolveApp(filename);
          filename = filename.replace(paths.appSrc, paths.appBuild);
        }

        const existsHtml = htmls.includes(filename);

        if (existsHtml) {
          throw new Error(`html filename conflict with:\n${filename}`);
        } else {
          htmls.push(filename);
        }

        const chunk = index.toString();

        entry[chunk] = resolveApp(app.entry);

        plugins.push(
          /**
           * CreateHTML
           * @param app App
           * https://github.com/facebook/create-react-app/blob/025f2739ceb459c79a281ddc6e60d7fd7322ca24/packages/react-scripts/config/webpack.config.js#L592
           */
          new HtmlWebpackPlugin({
            inject: true,
            filename,
            chunks: [chunk],
            template: template || paths.appHtml,
            minify: {
              removeComments: true,
              collapseWhitespace: true,
              removeRedundantAttributes: true,
              useShortDoctype: true,
              removeEmptyAttributes: true,
              removeStyleLinkTypeAttributes: true,
              keepClosingSlash: true,
              minifyJS: true,
              minifyCSS: true,
              minifyURLs: true,
            },
          })
        );
      });

      return {
        ...config,
        entry,
        output: {
          ...config.output,
          publicPath,
        },
        plugins,
      };
    };
  });
}

/**
 * https://github.com/facebook/create-react-app/blob/025f2739ceb459c79a281ddc6e60d7fd7322ca24/packages/react-scripts/config/webpack.config.js#L592
 */
export function removeUnnecessaryPlug(plugins: Plugin[] = []) {
  return plugins.filter(
    (plugin) =>
      !(plugin instanceof HtmlWebpackPlugin) &&
      !(plugin instanceof ManifestPlugin)
  );
}

function getSettings() {
  const craJson = getCraConfig();

  if (!craJson.app) return [];

  return Object.entries(craJson.app).map(([app, settings = {}]) => {
    if (!settings.entry) {
      throw new Error(`app "${app}" missing entry path`);
    }

    return settings as Options;
  });
}

/**
 * Okay, it goes without saying that this is very experimental,
 * so use it at your own risk.
 * https://github.com/facebook/create-react-app/blob/b45ae3c9caf10174d53ced1cad01a272d164f8de/packages/react-scripts/config/webpack.config.js#L314
 */
export function removeModuleScopePlugin() {
  cra.webpack((factory, { appTsConfig }) => {
    return (env) => {
      const config = factory(env);

      if (config.resolve?.plugins) {
        config.resolve.plugins = config.resolve.plugins.filter(
          (plugin) => !(plugin instanceof ModuleScopePlugin)
        );
      }

      if (fs.existsSync(appTsConfig)) {
        if (config.module?.rules[1]?.oneOf?.push) {
          // Process any TS outside of the app with ts-loader.
          (config.module.rules[1] as any)?.oneOf.push({
            test: /\.ts$/,
            loader: require.resolve("ts-loader"),
            exclude: /node_modules/,
            options: {
              transpileOnly: true,
              configFile: appTsConfig,
            },
          });
        }
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
