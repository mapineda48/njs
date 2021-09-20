import path from "path";
import * as fs from "fs-extra";
import ManifestPlugin from "webpack-manifest-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { cra } from "./cra";
import { craJson, AppOpt } from "./project";
import { ErrorInApp } from "./error";

import type { CliOptions } from "./cli";
import type { Entry, Plugin } from "webpack";

function prepareApps() {
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
  cra.config((get, paths) => {
    const config = get("production");

    const entry: Entry = {};

    const plugins = extractPlugins(config.plugins);

    const htmls: HtmlWebpackPlugin[] = [];

    const settings = getSettings();

    if (!settings || !settings.length) {
      throw new ErrorInApp("no found apps");
    }

    settings.forEach((app, index) => {
      const html = path.join(app.output, "index.html").replace(/^build\//i, "");

      const chunk = index.toString();

      entry[chunk] = path.resolve(app.entry);

      htmls.push(createHTML(html, chunk, paths.appHtml));
    });

    return () => {
      return {
        ...config,
        entry,
        output: {
          ...config.output,
          path: path.resolve("build"),
          publicPath: "./",
        },
        plugins: [...htmls, ...plugins],
      };
    };
  });
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

function getSettings() {
  if (!craJson.app) return [];

  return Object.entries(craJson.app).map(([app, settings = {}]) => {
    if (!settings.entry) {
      throw new Error(`app "${app}" missing entry path`);
    }
    if (!settings.entry) {
      throw new Error(`app "${app}" missing build path`);
    }

    return settings as Required<AppOpt>;
  });
}

function prepareApp(app: string, opt: CliOptions) {
  if (app) {
    if (fs.existsSync(app)) {
      cra.paths({ appIndexJs: path.resolve(app) });
    }

    const appIndexJs = craJson?.app?.[app]?.entry;

    if (appIndexJs) {
      cra.paths({ appIndexJs: path.resolve(appIndexJs) });
    }
  } else if (craJson.main) {
    const app = craJson?.app?.[craJson.main];

    if (app && app.entry) {
      cra.paths({ appIndexJs: path.resolve(app.entry) });

      if (app.output) {
        cra.paths({ appBuild: path.resolve(app.output) });
      }

      if (app.url) {
        cra.paths({ publicUrlOrPath: app.url });
      }
    }
  }

  if (opt?.output) {
    cra.paths({ appBuild: path.resolve(opt.output) });
  }
  if (opt?.url) {
    cra.paths({ publicUrlOrPath: opt.url });
  }
}

export function build(app: string, opt: CliOptions) {
  if (opt.allApps) {
    prepareApps();
  } else {
    prepareApp(app, opt);
  }

  cra.build();
}
