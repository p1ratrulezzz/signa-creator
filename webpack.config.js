"use strict";
const webpack = require("webpack");
const BowerWebpackPlugin = require('bower-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

// сборка для продакшена и для разработки
const NODE_ENV = process.env.NODE_ENV || "development";

module.exports = {
    context: __dirname + "/assets", // папка для поиска модулей

    entry: [
      // "bootstrap-webpack!./bootstrap.config.js",
      "./scripts/main"
    ],

    output: {
        path: "public", // папка с готовыми файлами
        filename: "[name].js", // шаблона названия файлов
        library: "[name]" // !!!! не известно
    },

    // иониторить изменение файлов при разработке
    watch: NODE_ENV == "development",

    watchOptions: { // уменьшаем задержку проверки изменений
        aggregateTimeout: 100
    },

    // генерировать sourcemap только для разработки
    devtool: NODE_ENV == "development" ? "cheap-inline-module-source-map" : null,

    plugins: [
        new webpack.NoErrorsPlugin(), //не создавать файлы с ощибками
        new webpack.DefinePlugin({// импортировать переменные в браузерный код
            NODE_ENV: JSON.stringify(NODE_ENV),
            LANG:     JSON.stringify("ru")
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "common"
        }),
        new BowerWebpackPlugin({
          excludes: /.*\.less/
        }),
        new webpack.ProvidePlugin({
          $:      "jquery",
          jQuery: "jquery"
        }),
    ],

// для скорости, меньше вариантов для поиска модулей
    resolve: { // пути поиска плагинов для вебпак
        modulesDirectories: ["node_modules"],
        extensions: ["", ".js"]
    },

    resolveLoader: {
        modulesDirectories: ["node_modules"],
        moduleTemplates: ["*-loader", "*"],
        extensions: ["", ".js"]
    },

    module: {
      loaders: [
        { // изменяет исходный файл и дает скомпилированный
            test: /\.js$/,
            loader: "babel-loader",
            query: {
                presets: ["es2015"]
            }
        },
        {
            test: /\.css$/,
            loader: "css-loader!autoprefixer-loader"
        },
        {
            test: /\.scss$/,
            loader: "css-loader!sass-loader"
        },
      ]
    }
};

// Если в продакшен то минифицируем код
if (NODE_ENV == "production") {
    module.exports.plugins.push( // добавляем плагин минификации в конец массива с плагинами
        new webpack.optimize.UglifyJsPlugin({
            comoress: {
                warnings:     false,
                drop_console: true,
                unsafe:       true
            }
        })
    );
};
