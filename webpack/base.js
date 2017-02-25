const webpack              = require('webpack');
const path                 = require('path');
const ExtractTextPlugin    = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin    = require('html-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const packageJson          = require('../package.json');

module.exports = function () {
  return {
    devtool: 'cheap-module-source-map',
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
      modules: [
        path.resolve('./src'),
        'node_modules'
      ],
      extensions: ['.js', '.vue', '.css'],
      alias: {
        vue$: 'vue/dist/vue.common.js'
      }
    },

    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        {
          test: /\.ejs$/,
          loader: 'ejs-compiled-loader'
        },
        {
          test: /\.jsx?$/i,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              { loader: 'css-loader?sourceMap' },
              { loader: 'postcss-loader' }
            ]
          })
        },
        {
          test: /\.(pdf|jpe?g|png|gif|ttf|eot|svg|woff2?)$/i,
          use: [
            {
              loader: 'file-loader?name=[name].[hash].[ext]'
            }
          ]
        }
      ]
    },

    plugins: [
      new webpack.LoaderOptionsPlugin({
        options: {
          context: 'src/',
          postcss: [
            require('postcss-import'),
            require('postcss-cssnext')({
              browsers: ['last 3 versions'],
              features: {
                rem: false
              }
            })
          ]
        }
      }),
      new ExtractTextPlugin({
        filename: 'style.[chunkhash].css',
        allChunks: true
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: Infinity
      }),
      new HtmlWebpackPlugin({
        template: './src/index.ejs',
        inject: 'body'
      }),
      new WebpackCleanupPlugin(),
      new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en-au/)
    ]
  };
};
