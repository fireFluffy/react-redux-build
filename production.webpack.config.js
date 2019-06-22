const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
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
    filename: 'js/[name].[hash].js',
    path: path.join(__dirname, 'build'),
    publicPath: './',
  },

  module: {
    rules: [
      {
        test: /\.(eot|gif|jpe?g|png|svg|ttf|woff|woff2)$/i,
        include: /[/\\](fonts|img)[/\\]/,
        loader: 'file-loader',
        options: {
          name: filePath =>
            /(\\|\/)fonts(\\|\/)/.test(filePath)
              ? 'fonts/[name].[ext]'
              : 'img/[name].[ext]'
        },
      },

      {
        include: /[/\\]icons[/\\]/,
        loader: 'svg-react-loader',
        test: /\.svg$/
      }
    ]
  }

  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['build/']
    }),
    new ExtractTextPlugin({
      filename: 'css/styles.[chunkhash].css',
    }),
    new HtmlWebpackPlugin({
      alwaysWriteToDisk: true,
      filename: 'index.html',
      template: './src/index.html'
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
