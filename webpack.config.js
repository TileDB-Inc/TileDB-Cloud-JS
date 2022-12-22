const path = require("path");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const nodeExternals = require('webpack-node-externals');

const nodeBundleConfig = {
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /\.test\.tsx$/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "lib"),
    library: {
      type: "commonjs2",
    },
  },
  target: "node",
  externals: [nodeExternals()]
};

const webBundleConfig = {
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /\.test\.tsx$/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "browser.js",
    path: path.resolve(__dirname, "lib"),
    library: {
      type: "umd",
    },
  },
  target: "web",
  plugins: [new NodePolyfillPlugin()],
};

module.exports = [nodeBundleConfig, webBundleConfig];
