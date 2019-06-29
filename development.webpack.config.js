const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const merge = require('webpack-merge');

const mainConfig = require('./main.webpack.config');

const devConfig = {
  mode: 'development',
  devtool: 'eval-source-map',

  entry: {
    host: 'webpack-dev-server/client?http://localhost:3001/',
    bundle: './src/index.jsx',
    styles: './assets/less/global.less'
  },

  output: {
    filename: './js/[name].[hash].js',
    path: path.resolve(__dirname, 'public'),
  },

  devServer: {
    inline: true,
    hot: true,
    host: 'localhost',
    port: 3001,
    headers: { 'Access-Control-Allow-Origin': '*' },
    disableHostCheck: true,
    historyApiFallback: true,
    contentBase: [
      path.join(__dirname, 'assets')
    ],
    watchContentBase: true,
    open: 'google-chrome',
    stats: 'errors-only'
  },

  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['public/']
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, 'assets/html/index.html'),
    }),
    new webpack.NamedModulesPlugin()
  ]
};

const config = merge(mainConfig, devConfig);
module.exports = config;
