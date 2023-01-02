const { merge } = require("webpack-merge");
const { ProvidePlugin } = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
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
    publicPath: "http://localhost:8080/",
  },
  devServer: {
    historyApiFallback: true,
    static: {
      directory: "./public",
    },
    compress: true,
    port: 8080,
  },
  plugins: [
    new ProvidePlugin({
      React: "react", // automatically import react where needed
    }),
    new ModuleFederationPlugin({
      name: "main",
      remotes: {
        auth: `auth@http://localhost:8081/remoteEntry.js`,
        store: `store@http://localhost:8082/remoteEntry.js`,
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
        "react-icons": {
          singleton: true,
          requiredVersion: dependencies["react-icons"],
        },
      },
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
