const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackConfig = require('webpack-config').default;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const cssImport = require('postcss-import');
const cssNext = require('postcss-cssnext');
const packageJson = require('../package.json');

module.exports = new WebpackConfig().merge({
  context: path.resolve(__dirname, '..'),

  entry: {
    app: './src/js/app.js',
    vendor: Object.keys(packageJson.dependencies)
  },

  output: {
    path: path.join(__dirname, '../build'),
    publicPath: '/',
    filename: '[name].[chunkhash].js'
  },

  resolve: {
    root: path.resolve('./src'),
    alias: {
      'vue$': 'vue/dist/vue.common.js'
    },
    extensions: ['', '.js', '.css']
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ],

    preLoaders: [
      {
        test: /\.js$/i,
        loader: 'eslint-loader',
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.ejs$/,
        loader: 'ejs-compiled-loader'
      },
      {
        test: /\.js$/i,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap!postcss-loader')
      },
      {
        test: /\.(jpe?g|png|gif|ttf|eot|svg|woff2?)$/i,
        loader: 'file?name=[name].[hash].[ext]'
      }
    ]
  },

  postcss: [
    cssImport(),
    cssNext({
      browsers: ['last 3 versions'],
      features: {
        rem: false
      }
    })
  ],

  plugins: [
    new ExtractTextPlugin('style.[chunkhash].css'),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity
    }),
    new HtmlWebpackPlugin({
      template: './src/index.ejs',
      inject: 'body'
    }),
    new WebpackCleanupPlugin()
  ]
});
