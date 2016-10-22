const webpack = require('webpack');
const config = require('./webpack.client.js');

const wds = {
  hostname: 'localhost',
  port: 8081
};

config.cache = true;
config.debug = true;
config.devtool = 'cheap-module-eval-source-map';

config.entry.client.unshift(
  'eventsource-polyfill',
  'webpack-dev-server/client?http://' + wds.hostname + ':' + wds.port,
  'webpack/hot/only-dev-server'
);


config.devServer = {
  publicPath: 'http://' + wds.hostname + ':' + wds.port + '/',
  hot: true,
  inline: false,
  lazy: false,
  quiet: true,
  noInfo: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
  },
  stats: { colors: true },
  host: wds.hostname,
  port: wds.port
};

config.output.publicPath = config.devServer.publicPath;

config.plugins.push(
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin()
);

module.exports = config;
