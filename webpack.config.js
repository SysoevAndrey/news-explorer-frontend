const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackMd5Hash = require("webpack-md5-hash");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const ImageminPlugin = require("imagemin-webpack-plugin").default;
const FontminPlugin = require("fontmin-webpack");

const isDev = process.env.NODE_ENV === "development";

module.exports = {
  entry: {
    main: "./src/index.js",
    articles: "./src/saved-articles/index.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "./JS/[name].[chunkhash].js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: {
          // presets: ["env", "react", "es2015"],
          plugins: ["transform-class-properties"],
        },
      },
      {
        test: /\.(png|jpe?g|gif|ico|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "./images/[name].[ext]",
            },
          },
        ],
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: "file-loader?name=./vendor/[name].[ext]",
      },
      {
        test: /\.css$/i,
        use: [
          isDev
            ? "style-loader"
            : {
                loader: MiniCssExtractPlugin.loader,
                options: { publicPath: "../" },
              },
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
            },
          },
          "postcss-loader",
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "./css/[name].[contenthash].css",
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: "./src/index.html",
      filename: "index.html",
      chunks: ["main"],
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: "./src/saved-articles/articles.html",
      filename: "./articles.html",
      chunks: ["articles"],
    }),
    new WebpackMd5Hash(),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require("cssnano"),
      cssProcessorPluginOptions: {
        preset: ["default"],
      },
      canPrint: true,
    }),
    new ImageminPlugin({
      disable: process.env.NODE_ENV !== "production",
      pngquant: {
        quality: "95-100",
      },
    }),
    new FontminPlugin({
      autodetect: true,
      glyphs: ["\uf0c8"],
    }),
  ],
};
