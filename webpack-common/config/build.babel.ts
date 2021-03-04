import path from "path";
import fs from "fs-extra";
import glob from "glob";
import HtmlWebpackPlugin from "html-webpack-plugin";
import OptimizeCSSAssetsPlugin from "optimize-css-assets-webpack-plugin";
import TerserJSPlugin from "terser-webpack-plugin";
import { extensions, getOneOf, getPlugins } from "./common";

import type webpack from "webpack";

const [entry, htmls] = createEntry();

const config: webpack.Configuration = {
  mode: "production",
  entry,
  output: {
    filename: "static/js/[name].[contenthash:8].js",
    chunkFilename: "static/js/[name].[contenthash:8].js",
    path: path.resolve("build"),
    publicPath: "/",
  },

  resolve: {
    extensions,
  },

  module: {
    rules: [getOneOf()],
  },

  plugins: [...getPlugins(), ...htmls],

  devtool: "source-map",

  optimization: {
    minimize: true,
    splitChunks: {
      chunks: "all",
      name: false,
    },
    runtimeChunk: {
      name: (entrypoint) => `runtime-${entrypoint.name}`,
    },

    minimizer: [
      new TerserJSPlugin({ sourceMap: true }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          parser: require("postcss-safe-parser"),
          map: {
            // `inline: false` forces the sourcemap to be output into a
            // separate file
            inline: false,
            // `annotation: true` appends the sourceMappingURL to the end of
            // the css file, helping the browser find the sourcemap
            annotation: true,
          },
        },
        cssProcessorPluginOptions: {
          preset: ["default", { minifyFontValues: { removeQuotes: false } }],
        },
      }),
    ],
  },
};

export default config;

function findHtml() {
  return glob.sync("src/**/index.html");
}

function createEntry() {
  const entry: webpack.Entry = {};

  const plugins: webpack.Plugin[] = [];

  findHtml().forEach((file, _index) => {
    const name = _index.toString();

    const scripts = [
      file.replace(/html$/i, "ts"),
      file.replace(/html$/i, "tsx"),
      file.replace(/html$/i, "js"),
      file.replace(/html$/i, "jsx"),
    ];

    const [index] = scripts.filter((path) => fs.existsSync(path));

    entry[name] = [
      "core-js/stable",
      "regenerator-runtime/runtime",
      path.resolve(index),
    ];

    plugins.push(
      new HtmlWebpackPlugin({
        filename: file.replace("src/", "").replace(/\//g, "-"),
        chunks: [name],
        inject: true,
        template: file,
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

  return [entry, plugins] as const;
}
