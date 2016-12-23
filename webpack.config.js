const WebpackConfig = require('webpack-config').default;
const environment = require('webpack-config').environment;

environment.setAll({
  env: function() {
    return process.env.NODE_ENV || 'development';
  }
});

exports.default = new WebpackConfig().extend('webpack/webpack.[env].config.js');
