#!/usr/bin/env node
const fs = require('fs');
const WebpackIsomorphicTools = require('webpack-isomorphic-tools');
const path = require('path');
const conf = require('./config/assets.config');

try {
  const babelrc = fs.readFileSync('./.babelrc');
  const config = JSON.parse(babelrc);
  require('babel-register')(config);
  require('babel-polyfill');
} catch (err) {
  /* eslint no-console: ["error", { allow: ["error"] }] */
  console.error('==>     ERROR: Error parsing your .babelrc.');
  console.error(err);
}

const rootDir = path.resolve(__dirname, '.');

function runServer() {
  require('./server/server');
}

global.webpackIsomorphicTools = new WebpackIsomorphicTools(conf)
  .server(rootDir, runServer);
