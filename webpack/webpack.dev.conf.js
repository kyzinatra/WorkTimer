/** @format */

const webpack = require("webpack");
const merge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.conf.js");

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: "development",
  devtool: "#cheap-module-eval-source-map",
  devServer: {
    historyApiFallback: true,
    contentBase: baseWebpackConfig.externals.paths.dist,
    port: 8081,
    overlay: {
      warnings: false,
      errors: true,
    },
  },

  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: "[file].map",
    }),
  ],
});

module.exports = Promise.resolve(devWebpackConfig);
