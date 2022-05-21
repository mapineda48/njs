import path from "path";
import glob from "glob";

import type { Configuration } from "webpack";

require("dotenv").config();

const isDev = process.env.NODE_ENV === "development";

const common = path.resolve("frontend/common");

const build = isDev ? "frontend/public/social/static/js" : "frontend/build/static/js";

const dist = path.resolve(__dirname, build);

const files = Object.fromEntries(
  glob
    .sync("**", { cwd: common })
    .filter((file) => file !== "tsconfig.json")
    .filter((file) => file.endsWith(".ts"))
    .map((file) => [file.replace(/.ts$/, ".js"), path.join(common, file)])
);

if (isDev) {
  console.log(files);
}

const config: Configuration = {
  mode: isDev ? "development" : "production",
  devtool: isDev ? 'source-map' : undefined,
  entry: files,
  output: {
    path: dist,
    filename: "[name]",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: "ts-loader",
          options: {
            configFile: path.resolve("frontend/common/tsconfig.json"),
          },
        },
      },
    ],
  },
};

export default config;
