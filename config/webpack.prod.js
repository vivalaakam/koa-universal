const webpack = require('webpack');
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const config = require('./webpack.config');
const assetsConfig = require('./assets.config');

const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(assetsConfig);

config.plugins.push(
  new ExtractTextPlugin('styles.css', {
    allChunks: true
  }),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }),
  webpackIsomorphicToolsPlugin
);

config.module.loaders.push(
  {
    test: /\.less$/,
    loader: ExtractTextPlugin.extract('style', 'css!less')
  },
  {
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract('style-loader',
      'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass-loader')
  },
  {
    test: /\.css$/,
    loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
  }
);

module.exports = config;
