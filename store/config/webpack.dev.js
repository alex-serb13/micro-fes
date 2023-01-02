const { merge } = require("webpack-merge");
const { ProvidePlugin } = require("webpack");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const { dependencies } = require("../package.json");

// Work-around for Uncaught (in promise) TypeError: _emotion_styled__WEBPACK_IMPORTED_MODULE_0__ is not a function
delete dependencies["@emotion/styled"];
delete dependencies["swr"];

const devConfig = {
  entry: "./src/index.js",
  mode: "development",
  output: {
    publicPath: "http://localhost:8082/",
  },
  devServer: {
    historyApiFallback: true,
    static: {
      directory: "./public",
    },
    compress: true,
    port: 8082,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "store",
      filename: "remoteEntry.js",
      exposes: {
        "./store": "./src/store",
      },
      shared: {
        ...dependencies,
        react: {
          singleton: true,
          requiredVersion: dependencies["react"],
        },
        "react-dom": {
          singleton: true,
          requiredVersion: dependencies["react-dom"],
        },
      },
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
