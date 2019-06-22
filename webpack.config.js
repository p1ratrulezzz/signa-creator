const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, argv) => {
  let devMode = argv.mode === "development";

  console.log('Development mode: ' + (devMode ? 'enabled' : 'disabled'));
  return {
    entry: "./src/index.js",
    devtool: devMode ? "sourcemap" : false,
    output: {
      path: path.join(__dirname, "/docs"),
      filename: "index_bundle.js"
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.(sass|scss|css)$/,
          use: [
            "style-loader",
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: "../",
                hmr: devMode
              }
            },
            "css-loader",
            {
              loader: "postcss-loader",
              options: {
                ident: "postcss",
                plugins: (loader) => {
                  if(devMode) {
                    return []
                  } else {
                    return [
                      require('autoprefixer')(),
                      require("cssnano")()
                    ]
                  }
                }
              }
            },
            "sass-loader"
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html"
      }),
      new CopyWebpackPlugin([{ from: "./src/images", to: "./images" }]),
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: "[name].css",
        chunkFilename: "[id].css"
      })
    ],
    devServer: {
      contentBase: path.join(__dirname, "dist"),
      compress: false,
      port: 3000
    }
  };
};
