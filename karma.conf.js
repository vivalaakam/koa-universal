const webpackConfig = require('./config/webpack.test');

module.exports = function conf(config) {
  config.set({
    browsers: ['PhantomJS'],
    singleRun: !!process.env.CI,
    frameworks: ['mocha'],
    files: [
      'spec/**/*.spec.jsx',
      'spec/**/*.spec.js'
    ],
    preprocessors: {
      'common/**/*.jsx': ['webpack', 'sourcemap'],
      'spec/**/*.jsx': ['webpack', 'sourcemap']
    },
    reporters: ['mocha'],
    webpack: webpackConfig,
    webpackServer: {
      noInfo: true
    },
    plugins: [
      'karma-webpack',
      'karma-mocha',
      'karma-mocha-reporter',
      'karma-sourcemap-loader',
      'karma-phantomjs-launcher'
    ]
  });
};
