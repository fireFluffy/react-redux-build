const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const merge = require('webpack-merge');

const mainConfig = require('./main.webpack.config');

const prodConfig = {
  mode: 'production',

  entry: {
    bundle: './src/index.jsx',
    styles: './resources/less/global.less'
  },

  output: {
    filename: './js/[name].[hash].js',
    path: path.resolve(__dirname, 'build'),
  },

  module: {
    rules: [
      {
        test: /\.(eot|gif|jpe?g|png|svg|ttf|woff|woff2)$/i,
        include: /[/\\](fonts|img)[/\\]/,
        loader: 'file-loader',
        options: {
          name: filePath => {
            console.log(filePath);
            return /(\\|\/)fonts(\\|\/)/.test(filePath)
            ? 'fonts/[name].[ext]'
            : 'img/[name].[ext]';
          }
        },
      },
    ]
  },

  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [path.join(process.cwd(), 'build/**/*'),]
    }),
    new HtmlWebpackPlugin({
      alwaysWriteToDisk: true,
      filename: 'index.html',
      template: path.join(__dirname, 'resources/html/index.html'),
    }),
    new HtmlWebpackHarddiskPlugin()
  ],

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          ecma: 6,
          output: {
            beautify: false,
            comments: false,
          }
        }
      })
    ]
  }
};

const config = merge(mainConfig, prodConfig);
module.exports = config;
