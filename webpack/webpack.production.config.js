const webpack = require('webpack');
const WebpackConfig = require('webpack-config').default;

module.exports = new WebpackConfig().extend('./webpack/webpack.base.config.js').merge({
  debug: false,
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    });
  ]
});
