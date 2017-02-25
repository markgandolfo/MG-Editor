const webpack               = require('webpack');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const webpackMerge          = require('webpack-merge');
const commonConfig          = require('./base.js');

module.exports = function(env) {
  return webpackMerge(commonConfig(), {
    devtool: 'source-map',
    plugins: [
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
      }),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        sourceMap: true,
        beautify: false,
        comments: false,
        mangle: {
          screw_ie8: true,
          keep_fnames: true
        },
        compress: {
          warnings: false,
          screw_ie8: true,
          dead_code: true,
          unused: true
        }
      }),
      // new FaviconsWebpackPlugin('./src/assets/img/favicon.png')
    ]
  });
}
