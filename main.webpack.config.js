const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');

const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

module.exports = {
  resolve: {
    extensions: ['.mjs', '.js', '.jsx', '.json'],
    modules: [path.resolve(__dirname), 'node_modules'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },

      {
        test: /(\.css|\.less)$/,
        use: [
          'style-loader',
          { loader: MiniCssExtractPlugin.loader },
          'css-loader',
          'postcss-loader',
          'less-loader',
        ],
      },

      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            fallback: 'file-loader',
            name: '[hash].[ext]',
            publicPath: IS_DEVELOPMENT ? '../files' : path.join(__dirname, 'build/files'),
            outputPath: 'files',
            limit: 100,
          },
        },
      },

      {
        include: /[/\\]icons[/\\]/,
        loader: 'svg-react-loader',
        test: /\.svg$/,
      },
    ],
  },

  plugins: [
    new FixStyleOnlyEntriesPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/styles.[chunkhash].css',
    }),
    new webpack.WatchIgnorePlugin([path.resolve(__dirname, 'node_modules')]),
  ],
};
