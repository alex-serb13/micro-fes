const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const { dependencies } = require("../package.json");

// Work-around for Uncaught (in promise) TypeError: _emotion_styled__WEBPACK_IMPORTED_MODULE_0__ is not a function
delete dependencies["@emotion/styled"];
delete dependencies["swr"];

const prodConfig = {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js",
    publicPath: "/store/latest/",
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "store",
      filename: "remoteEntry.js",
      exposes: {
        "./store": "./src/store",
      },
      shared: dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
