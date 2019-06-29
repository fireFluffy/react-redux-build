const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");

module.exports = {
  resolve: {
    extensions: ['.mjs', '.js', '.jsx', '.json'],
    modules: [path.resolve(__dirname), 'node_modules']
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/i,
        exclude: /node_modules/,
        use: 'babel-loader'
      },

      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          {
            loader: 'less-loader',
          }
        ]
      },

      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      }, 

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

      {
        include: /[/\\]icons[/\\]/,
        loader: 'svg-react-loader',
        test: /\.svg$/
      }
    ]
  },

  plugins: [
    new FixStyleOnlyEntriesPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/styles.[chunkhash].css',
    }),
    new webpack.WatchIgnorePlugin([path.resolve(__dirname, 'node_modules')])
  ]
};