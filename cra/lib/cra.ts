import path from "path";
import ManifestPlugin from "webpack-manifest-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";

import type { Configuration, Entry, Plugin } from "webpack";
import type { App } from "./paths";

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

export function builds(apps: App[], url: string) {
  /**
   * prevent process exit missing file
   * https://github.com/facebook/create-react-app/blob/025f2739ceb459c79a281ddc6e60d7fd7322ca24/packages/react-scripts/scripts/build.js#L59
   */
  const [app] = apps;
  overwritePath({ appIndexJs: app.entry });

  overwritePaths(apps, url);

  require(src.build);
}

/**
 * overwrite react-scripts's webpack config
 * https://github.com/facebook/create-react-app/blob/025f2739ceb459c79a281ddc6e60d7fd7322ca24/packages/react-scripts/config/webpack.config.js#L74
 */
export function overwritePaths(apps: App[], url: string) {
  const paths: Paths = require(src.paths);

  const factory: FactoryConfig = require(src.config);

  const current = factory("production");

  const entry: Entry = {};

  const plugins = extractPlugins(current.plugins);

  const htmls: HtmlWebpackPlugin[] = [];

  apps.forEach((app, index) => {
    const html = path.join(app.output, "index.html").replace(/^build\//i, "");

    const chunk = index.toString();

    entry[chunk] = path.resolve(app.entry);

    htmls.push(createHTML(html, chunk, paths.appHtml));
  });

  const config: Configuration = {
    ...current,
    entry,
    output: {
      ...current.output,
      path: path.resolve("build"),
      publicPath: url,
    },
    plugins: [...htmls, ...plugins],
  };
  const rest = require.cache[src.config];

  delete require.cache[src.config];

  require.cache[src.config] = {
    ...rest,
    exports: function () {
      return config;
    },
  };

  return [entry, htmls, config] as const;
}

/**
 * CreateHTML
 * @param app App
 * https://github.com/facebook/create-react-app/blob/025f2739ceb459c79a281ddc6e60d7fd7322ca24/packages/react-scripts/config/webpack.config.js#L592
 */
export function createHTML(filename: string, chunk: string, template: string) {
  return new HtmlWebpackPlugin({
    inject: true,
    filename,
    chunks: [chunk],
    template,
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
  });
}

/**
 * https://github.com/facebook/create-react-app/blob/025f2739ceb459c79a281ddc6e60d7fd7322ca24/packages/react-scripts/config/webpack.config.js#L592
 */
export function extractPlugins(plugins: Plugin[] = []) {
  return plugins.filter(
    (plugin) =>
      !(plugin instanceof HtmlWebpackPlugin) &&
      !(plugin instanceof ManifestPlugin)
  );
}

export function build(paths: PathsArg) {
  overwritePath(paths);
  require(src.build);
}

export function start(paths: PathsArg) {
  overwritePath(paths);
  require(src.start);
}

/**
 * Update paths in cache with input
 * https://nodejs.org/api/modules.html#modules_require_cache
 * @param paths object
 * https://github.com/facebook/create-react-app/blob/6a51dcdfb84d1a47294fcbf9d7d569eaf1b4d571/packages/react-scripts/config/paths.js#L60
 */
export function overwritePath(paths: PathsArg) {
  deleteCache();

  const current: Paths = require(src.paths);

  const rest = require.cache[src.paths];

  delete require.cache[src.paths];

  require.cache[src.paths] = {
    ...rest,
    exports: {
      ...current,
      ...paths,
    },
  };

  require(src.paths);
}

/**
 * Important!!!
 * https://github.com/facebook/create-react-app/blob/025f2739ceb459c79a281ddc6e60d7fd7322ca24/packages/react-scripts/config/env.js#L15
 */
export function deleteCache() {
  (process as any).env.NODE_ENV = process.env.NODE_ENV || "production";
  require(src.env);
}
/**
 * Types
 */
export type Env = Configuration["mode"];

export type FactoryConfig = (env: Env) => Configuration;

export interface Config {
  [K: string]: App;
}

export type PathsArg = Partial<Paths>;

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
