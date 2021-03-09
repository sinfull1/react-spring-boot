import path from "path";
import webpack, { Configuration } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
import { TsconfigPathsPlugin } from "tsconfig-paths-webpack-plugin";
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer"); // help tailwindcss to work
const { ModuleFederationPlugin } = require("webpack").container;
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const deps = require("./package.json").dependencies;
import {API_URL} from './src/settings';
const webpackConfig = (env): Configuration => ({
  entry: "./src/index.tsx",
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    //@ts-ignore
    plugins: [new TsconfigPathsPlugin()],
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 3003,
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    publicPath: "http://localhost:3003/",
    filename: "js/[name].[contenthash].bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          transpileOnly: true,
        },
        exclude: /dist/,
      },
      {
        test: /\.(css|scss|sass)$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
         
        ],
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },

      // Images: Copy image files to build folder
      { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: "asset/resource" },

      // Fonts and SVGs: Inline files
      { test: /\.(woff(2)?|eot|ttf|otf|)$/, type: "asset/inline" },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new ModuleFederationPlugin({
      name: "travelApp",
      library: { type: "var", name: "travelApp" },
      filename: "remoteEntry.js",
      exposes: {
         "./NameWithInjector" : "./src/NamedInjector.tsx"
      },
      shared: {
        react: { eager: true,singleton:true},
        "react-dom": { eager: true, singleton: true },
        "redux": { eager: true, singleton: true },
        "react-redux": { eager: true, singleton: true },
        "redux-saga": { eager: true ,singleton:true},
        "@reduxjs/toolkit": { eager: true ,singleton:true},
        "redux-toolkit": { eager: true ,singleton:true}},
     //   
        }),
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new webpack.DefinePlugin({
      "process.env.PRODUCTION": env.production || !env.development,
      "process.env.NAME": JSON.stringify(require("./package.json").name),
      "process.env.VERSION": JSON.stringify(require("./package.json").version),
    }),
    new ForkTsCheckerWebpackPlugin({
      eslint: {
        files: "./src/**/*.{ts,tsx,js,jsx}", // required - same as command `eslint ./src/**/*.{ts,tsx,js,jsx} --ext .ts,.tsx,.js,.jsx`
      },
    }),
  ],
});

export default webpackConfig;
