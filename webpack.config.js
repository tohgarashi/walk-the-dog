const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");

module.exports = {
  mode: "development",
  entry: "./js/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
  },
  experiments: {
    asyncWebAssembly: true,
  },
  module: {
    rules: [
      {
        test: /\.wasm$/,
        type: "webassembly/async",
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, "static"), to: "" },
      ],
    }),
    new WasmPackPlugin({
      crateDirectory: __dirname,
    }),
  ],
  devServer: {
    static: path.resolve(__dirname, "dist"),
    port: 8080,
  },
  resolve: {
    extensions: [".js", ".wasm"],
  },
};
