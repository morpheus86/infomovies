"use strict";
const withCSS = require("@zeit/next-css");
module.exports = withCSS({
  webpack: function (config) {
    config.module.rules.push({
      test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
      use: {
        loader: "file-loader",
        options: {
          esModule: false,
          outputPath: "static/webfonts/",
          publicPath: "../webfonts/",
          name: "[name].[ext]",
        },
      },
    });
    return config;
  },
});
