import path from "path";
import webpack from "webpack";
import webpackDevServer from "webpack-dev-server";
import fs from "fs";

import dotenv from "dotenv";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";

const config = (env: NodeJS.ProcessEnv): webpack.Configuration => {
  // const enver = dotenv.config().parsed as { [name: string]: string };

  const currentPath = path.join(__dirname);

  // create base path from which we wstart. this is is the production env path, because we use .env for production
  const basePath = currentPath + "/.env";

  // now we want to check what is the current environemtn, and attach name of the environment to the base path .env. this way we automatically point to env for a specific environment

  const envPath = basePath + "." + env.ENVIRONMENT;

  // using fs to check if this file actually exists. if not, we fallback to the base path

  const finalPath = fs.existsSync(envPath) ? envPath : basePath;

  // using final path to create the enrinment var object. note use of path in the dotnet config

  const enver = dotenv.config({
    path: finalPath,
  }).parsed as { [name: string]: string };

  // const enver = dotenv.config().parsed as { [name: string]: string };

  const envKeys = Object.keys(enver).reduce((acc, val) => {
    acc[`process.env.${val}`] = JSON.stringify(enver[val]);
    return acc;
  }, {} as { [name: string]: string });

  return {
    entry: "./src/index.tsx",
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                "@babel/preset-react",
                "@babel/preset-typescript",
              ],
            },
          },
        },
        {
          test: /\.css$/,
          use: [{ loader: "style-loader" }, { loader: "css-loader" }],
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: "file-loader",
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    output: {
      path: path.resolve(__dirname, "build"),
      filename: "bundle.js",
    },
    devServer: {
      contentBase: path.join(__dirname, "public"),
      compress: true,
      port: 4000,
      historyApiFallback: true,
    },

    // devServer: {},
    plugins: [
      new ForkTsCheckerWebpackPlugin({
        async: false,
        eslint: {
          files: "./src/**/*.{ts,tsx,js,jsx}",
        },
      }),
      new webpack.DefinePlugin(envKeys),
    ],
  };
};

export default config;
