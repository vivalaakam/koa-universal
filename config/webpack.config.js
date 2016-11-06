const webpack = require('webpack');
const path = require('path');
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const assetsConfig = require('./assets.config');

const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(assetsConfig);

const config = {
  context: path.resolve(__dirname, '..'),
  entry: [
    'babel-polyfill', './client/client'
  ],
  output: {
    filename: 'bundle.js',
    sourceMapFilename: 'bundle.js.map',
    path: path.join(__dirname, '../assets'),
    publicPath: '/'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015-node5', 'es2016-node5']
        }
      },
      {
        test: webpackIsomorphicToolsPlugin.regular_expression('images'),
        loader: 'url-loader?limit=8192'
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        HOST: JSON.stringify('client')
      }
    }),
    new webpack.ProvidePlugin({
      fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    })
  ]
};

module.exports = config;
