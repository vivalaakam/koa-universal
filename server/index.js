require('babel-core/register');
require('babel-polyfill');

var hook = require('css-modules-require-hook');

hook({
  extensions: ['.css', '.scss'],
  generateScopedName: '[name]__[local]___[hash:base64:5]'
});

require('./server');
