const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const { dependencies } = require("../package.json");

const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js",
    publicPath: "/main/latest/",
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "main",
      remotes: {
        auth: `auth@${domain}/auth/latest/remoteEntry.js`,
        store: `dashboard@${domain}/store/latest/remoteEntry.js`,
      },
      shared: dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
