const hook = require('css-modules-require-hook');
require('babel-core/register');
require('babel-polyfill');


hook({
  extensions: ['.css', '.scss'],
  generateScopedName: '[name]__[local]___[hash:base64:5]'
});

require('./server');
