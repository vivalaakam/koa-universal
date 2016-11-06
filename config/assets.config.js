const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');

module.exports = {
  webpack_assets_file_path: './assets/assets.json',
  assets: {
    images: {
      extensions: ['png', 'jpg', 'gif', 'ico', 'svg']
    },
    style_modules: {
      extensions: ['scss'],
      filter: function styleFilter(module, regex, options, log) {
        if (options.development) {
          return WebpackIsomorphicToolsPlugin.style_loader_filter(module, regex, options, log);
        }
        return regex.test(module.name);
      },
      path: function stylePath(module, options, log) {
        if (options.development) {
          return WebpackIsomorphicToolsPlugin.style_loader_path_extractor(module, options, log);
        }
        return module.name;
      },
      parser: function styleParser(module, options, log) {
        if (options.development) {
          return WebpackIsomorphicToolsPlugin.css_modules_loader_parser(module, options, log);
        }
        return module.source;
      }
    },
    fonts: {
      extensions: [
        'woff',
        'woff2',
        'ttf',
        'eot'
      ],
      parser: WebpackIsomorphicToolsPlugin.url_loader_parser
    }
  }
};
