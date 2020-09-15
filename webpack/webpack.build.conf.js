/** @format */

const merge = require("webpack-merge");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const baseWebpackConfig = require("./webpack.base.conf");
const TerserPlugin = require("terser-webpack-plugin");

const buildWebpackConfig = merge(baseWebpackConfig, {
  mode: "production",
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({ test: /\.js(\?.*)?$/i })],
  },
  plugins: [new BundleAnalyzerPlugin()],
});

module.exports = Promise.resolve(buildWebpackConfig);
