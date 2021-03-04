import path from "path";
import fs from "fs-extra";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { env, extensions, getOneOf, getPlugins, isProduction } from "./common";

import type webpack from "webpack";

const hello = "web/entry/hello";

const dir = process.argv[4] || hello;

const [entry] = [
  path.resolve(dir, "index.ts"),
  path.resolve(dir, "index.tsx"),
].filter((path) => fs.existsSync(path));

const output = path.resolve("dist");

const [html] = [path.resolve(dir, "index.html")].filter((path) =>
  fs.existsSync(path)
);

const config: webpack.Configuration = {
  mode: env,
  entry: ["core-js/stable", "regenerator-runtime/runtime", entry],
  output: {
    filename: "static/js/[name].[hash:8].js",
    chunkFilename: "static/js/[name].[hash:8].chunk.js",
    path: output,
  },

  module: {
    rules: [getOneOf()],
  },

  plugins: [
    ...getPlugins().filter(Boolean),
    new HtmlWebpackPlugin({
      inject: true,
      template: html,
    }),
  ],

  optimization: {
    minimize: isProduction,
    splitChunks: {
      chunks: "all",
    },
  },

  resolve: {
    extensions,
  },

  devtool: "cheap-module-source-map",

  devServer: {
    overlay: {
      errors: true,
      warnings: true,
    },
    hot: true,
  },
};

export default config;
