const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
  devtool: 'source-map',
  entry: {
    client: ['babel-polyfill', path.join(__dirname, '../client/client.js')]
  },
  output: {
    filename: 'js/[name].js',
    sourceMapFilename: '[name].js.map',
    path: path.join(__dirname, 'assets/'),
    publicPath: '/assets/'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style',
          'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass-loader')
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('style', 'css!less')
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015-node5', 'es2016-node5']
        }
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
    }),
    new ExtractTextPlugin('styles.css', {
      allChunks: true
    })
  ]
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.unshift(new webpack.optimize.UglifyJsPlugin(), new webpack.optimize.DedupePlugin());
}

module.exports = config;
