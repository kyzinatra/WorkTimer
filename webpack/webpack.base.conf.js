/** @format */

const fs = require("fs");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackAssetsManifest = require("webpack-assets-manifest");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");

const PATHS = {
	src: path.join(__dirname, "../src"),
	dist: path.join(__dirname, "../dist"),
	assets: "assets/",
};

const PAGES_DIR = `${PATHS.src}/pages/`;
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith(".pug"));

module.exports = {
	externals: {
		paths: PATHS,
	},
	entry: {
		app: PATHS.src,
	},
	output: {
		filename: `${PATHS.assets}js/[name].[contenthash:12].js`,
		chunkFilename: `${PATHS.assets}js/[name].[contenthash:12].js`,
		path: PATHS.dist,
		publicPath: "/",
	},

	resolve: {
		extensions: [".mjs", ".js", ".jsx", ".json", ".ts", ".tsx"],
	},

	optimization: {
		runtimeChunk: "single",
		splitChunks: {
			chunks: "all",
			maxInitialRequests: Infinity,
			minSize: 0,
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/i,
					name(module) {
						const name = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
						return `npm.${name.replace("@", "")}`;
					},
				},
			},
		},
	},
	module: {
		rules: [
			{
				test: /\.js(x)?$/,
				loader: "babel-loader",
				options: {
					presets: ["@babel/preset-env", "@babel/preset-react"],
					plugins: [
						"@babel/plugin-proposal-object-rest-spread",
						"@babel/plugin-proposal-class-properties",
						"@babel/plugin-proposal-private-methods",
					],
				},
				exclude: /node_modules/,
			},
			{
				test: /\.ts(x)?$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
			{
				test: /\.pug$/,
				loader: "pug-loader",
			},
			{
				test: /\.(png|jp[2g]|webp|tiff|jfif|jpeg(2000)?|ico|bem|gif|svg)$/i,
				loader: "file-loader",
				options: {
					name: "[name].[ext]",
				},
			},
			{
				test: /\.s[ac]ss$/,
				use: [
					"style-loader",
					MiniCssExtractPlugin.loader,
					{
						loader: "css-loader",
						options: { sourceMap: true },
					},
					{
						loader: "postcss-loader",
						options: {
							sourceMap: true,
							config: { path: `./webpack/postcss.config.js` },
						},
					},
					{
						loader: "sass-loader",
						options: { sourceMap: true },
					},
				],
			},
			{
				test: /\.css$/,
				use: [
					"style-loader",
					MiniCssExtractPlugin.loader,
					{
						loader: "css-loader",
						options: { sourceMap: true },
					},
					{
						loader: "postcss-loader",
						options: {
							sourceMap: true,
							config: { path: `./webpack/postcss.config.js` },
						},
					},
				],
			},
		],
	},
	plugins: [
		new webpack.HashedModuleIdsPlugin(),
		new WebpackAssetsManifest({
			output: "./assets-manifest.json",
		}),
		new MiniCssExtractPlugin({
			filename: `${PATHS.assets}css/[name].[contenthash:12].css`,
		}),
		new CleanWebpackPlugin(),
		...PAGES.map(
			page =>
				new HtmlWebpackPlugin({
					template: `${PAGES_DIR}/${page}`,
					filename: `./${page.replace(/\.pug/, ".html")}`,
				})
		),
		new CopyWebpackPlugin({
			patterns: [
				// { from: `${PATHS.src}/img`, to: `${PATHS.assets}img` },
				{ from: `${PATHS.src}/static`, to: "./" },
			],
		}),
	],
};
