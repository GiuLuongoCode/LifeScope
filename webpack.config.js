require('dotenv').config();
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: {
        main: path.resolve(__dirname, './src/index.js'),
      },
      output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'deploy')
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          },
          {
            test: /\.css$/,
            use: ["style-loader", "css-loader"]
          },
          { 
            test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
            type: 'asset/resource',
          },
        ],
      },
    plugins: [
    new Dotenv(),
    new HtmlWebpackPlugin({
      title: process.env.APP_TITLE,
      meta: {
        'description': {name: 'description', content: "LifeScope is an application that allows you to explore and obtain information about the quality of life in cities around the world. Using the external Teleport service, you can enter the name of a city and receive detailed data covering various aspects of urban life."},
        'og:title': {property: 'og:title', content: process.env.APP_TITLE},
        'og:type': {property: 'og:type', content: 'website'}
      },
      favicon: 'asset/img/lifeScope.ico'
    }),
  ],
};

