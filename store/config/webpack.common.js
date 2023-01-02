module.exports = {
  module: {
    // exclude node_modules
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", "@babel/preset-env"],
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
      },
    ],
  },
  // pass all js files through Babel
  resolve: {
    extensions: ["*", ".js", ".jsx"],
  },
};
