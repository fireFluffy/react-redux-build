const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = () => ({
  mode: 'development',
  devtool: '#eval-source-map',
  resolve: {
    extensions: ['.mjs', '.js', '.jsx', '.json'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  },

  entry: {
    host: 'webpack-dev-server/client?http://localhost:3001/',
    bundle: './src/index.jsx',
    styles: './resources/less/global.less'
  },

  output: {
    filename: 'js/[name].[hash].js',
    path: path.join(__dirname, 'public'),
    publicPath: 'http://localhost:3001/'
  },


  devServer: {
    host: 'localhost',
    port: 3001,
    headers: { 'Access-Control-Allow-Origin': '*' },
    disableHostCheck: true,
    historyApiFallback: true,
    contentBase: path.join(__dirname, 'dist'),
    open: 'google-chrome'
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
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'postcss-loader',
            {
              loader: 'less-loader',
              options: {
                javascriptEnabled: true,
              },
            },
          ],
        }),
      },

      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },

      {
        test: /\.(eot|gif|jpe?g|png|svg|ttf|woff|woff2)$/i,
        include: /[/\\](fonts|img)[/\\]/,
        loader: 'file-loader',
        options: {
          name: filePath =>
            /(\\|\/)fonts(\\|\/)/.test(filePath)
              ? 'fonts/[name][hash].[ext]'
              : 'img/[name][hash].[ext]'
        },
      },

      {
        include: /[/\\]icons[/\\]/,
        loader: 'svg-react-loader',
        test: /\.svg$/
      },
    ]
  },

  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['public/']
    }),
    new ExtractTextPlugin({
      filename: 'css/styles.[chunkhash].css'
    }),
    new HtmlWebpackPlugin({
      alwaysWriteToDisk: true,
      filename: 'index.html',
      template: './src/index.html'
    }),
    new HtmlWebpackHarddiskPlugin(),
    new webpack.WatchIgnorePlugin([path.resolve(__dirname, 'node_modules')]),
    new webpack.NamedModulesPlugin()
  ]
});