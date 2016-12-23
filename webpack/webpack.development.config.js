const webpack = require('webpack');
const WebpackConfig = require('webpack-config').default;

module.exports = new WebpackConfig().extend('./webpack/webpack.base.config.js').merge({
  debug: true,
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    inline: true,
    open: true,
    host: '0.0.0.0'
  }
});
