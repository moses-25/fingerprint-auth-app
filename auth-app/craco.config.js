const path = require('path');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Alias 'WebSdk' to the local SDK bundle so @digitalpersona/devices can resolve it
      webpackConfig.resolve = webpackConfig.resolve || {};
      webpackConfig.resolve.alias = {
        ...(webpackConfig.resolve.alias || {}),
        WebSdk: path.resolve(__dirname, 'src/sdk/index.js'),
      };

      // Disable the 'crypto' polyfill warning — legacy bundle doesn't need it in browser
      webpackConfig.resolve.fallback = {
        ...(webpackConfig.resolve.fallback || {}),
        crypto: false,
      };

      return webpackConfig;
    },
  },
};
