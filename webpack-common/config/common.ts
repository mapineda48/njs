/* eslint-disable @typescript-eslint/no-var-requires */
import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import OptimizeCSSAssetsPlugin from "optimize-css-assets-webpack-plugin";
import TerserJSPlugin from "terser-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

import type webpack from "webpack";

const ErrorOverlayPlugin = require("error-overlay-webpack-plugin");

export const env: any = process.env.NODE_ENV || "development";

export const isProduction = env === "production";

export const extensions = ["js", "jsx", "mjs", "ts", "tsx", "cjs"].map(
  (ext) => "." + ext
);

export function getCssUse(): webpack.RuleSetUseItem[] {
  const use: any = [
    // Creates `style` nodes from JS strings
    !isProduction && "style-loader",

    // Extract Css
    isProduction && MiniCssExtractPlugin.loader,

    // Translates CSS into CommonJS
    {
      loader: "css-loader",
      options: {
        importLoaders: 3,
        sourceMap: true,
      },
    },

    //Post
    {
      loader: "postcss-loader",

      options: {
        sourceMap: true,
        postcssOptions: {
          ident: "postcss",
          plugins: [
            [
              "postcss-preset-env",
              {
                // Options
                autoprefixer: {
                  flexbox: "no-2009",
                },
                stage: 3,
              },
            ],
            "postcss-normalize",
            "postcss-flexbugs-fixes",
          ],
        },
      },
    },

    {
      loader: "resolve-url-loader",
      options: {
        //root: path.join(__dirname, "src"),
        sourceMap: true,
        sourceMapContents: false,
      },
    },

    // Compiles Sass to CSS
    {
      loader: "sass-loader",
      options: { sourceMap: true },
    },
  ].filter(Boolean);

  return use;
}

export function getOneOf() {
  const oneOf: webpack.RuleSetRule[] = [
    {
      test: /\.(t|j)sx?$/i,
      loader: "babel-loader",
      options: {
        presets: [
          "@babel/preset-env",
          "@babel/preset-typescript",
          "@babel/preset-react",
        ],
        plugins: ["@babel/plugin-proposal-class-properties"],
      },
    },
    {
      test: /\.scss$/i,
      use: getCssUse(),
    },
    {
      test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
      loader: "url-loader",
      options: {
        limit: "10000",
        name: "static/media/[name].[hash:8].[ext]",
      },
    },
    {
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    },
    {
      loader: "file-loader",
      // Exclude `js` files to keep "css" loader working as it injects
      // its runtime that would otherwise be processed through "file" loader.
      // Also exclude `html` and `json` extensions so they get processed
      // by webpacks internal loaders.
      exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/, /\.svg$/],
      options: {
        name: "[name].[hash:8].[ext]",
        outputPath: "./static/media/",
      },
    },
  ];

  return { oneOf };
}

export function getPlugins(): webpack.Plugin[] {
  return [
    isProduction &&
      new MiniCssExtractPlugin({
        filename: "static/css/[name].[contenthash:8].css",
        chunkFilename: "static/css/[name].[contenthash:8].chunk.css",
      }),

    !isProduction && new ErrorOverlayPlugin(),
  ].filter(Boolean);
}

export function prod(prod: Prod): webpack.Configuration {
  const { entry, plugins } = prod;

  return {
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

    plugins: [...getPlugins(), ...plugins],

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
}

export function dev(dev: Dev): webpack.Configuration {
  const { entry, html } = dev;

  return {
    mode: env,
    entry: ["core-js/stable", "regenerator-runtime/runtime", entry],
    output: {
      filename: "static/js/[name].[hash:8].js",
      chunkFilename: "static/js/[name].[hash:8].chunk.js",
      path: undefined,
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
}

/**
 * Types
 */
interface Prod {
  entry: webpack.Configuration["entry"];
  plugins: webpack.Plugin[];
}

interface Dev {
  entry: string;
  html: string;
}
