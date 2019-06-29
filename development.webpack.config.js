const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const merge = require('webpack-merge');
const CleanTerminalPlugin = require('clean-terminal-webpack-plugin');

const mainConfig = require('./main.webpack.config');

const devConfig = {
  mode: 'development',
  devtool: 'eval-source-map',

  entry: {
    host: 'webpack-dev-server/client?http://localhost:3001/',
    bundle: './src/index.tsx',
    styles: './assets/less/global.less',
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
    contentBase: [path.join(__dirname, 'assets')],
    watchContentBase: true,
    open: 'google-chrome',
    stats: 'errors-only',
    publicPath: '/',
  },

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: 'eslint-loader',
            options: {
              emitError: true,
              emitWarning: true,
              failOnWarning: false,
              failOnError: false,
              outputReport: false,
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [path.join(process.cwd(), 'public/**/*')],
    }),
    new CopyWebpackPlugin([
      {
        from: 'assets/favicon',
        to: './assets/favicon',
      },
    ]),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, 'assets/html/index.html'),
    }),
    new CleanTerminalPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
};

const config = merge(mainConfig, devConfig);
module.exports = config;
