const webpack      = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./base.js');

module.exports = function(env) {
  return webpackMerge(commonConfig(), {
    devServer: {
      inline: true,
      open: true,
      host: '0.0.0.0'
    }
  });
}
