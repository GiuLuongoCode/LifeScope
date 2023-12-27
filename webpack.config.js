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
    new HtmlWebpackPlugin({
      title: "Webpack Output",
    }),
    new Dotenv(),
  ],
};

