const webpack = require('webpack');
const conf = require('./gulp.conf');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = {
  module: {
    loaders: [
      {
        test: /\.json$/,
        use: 'json-loader'
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: 'tslint-loader',
        enforce: 'pre'
      },
      {
        test: /\.scss$/,
        use: [
          'to-string-loader',
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [autoprefixer]
            }
          },
          'sass-loader',
        ]
      },
      {
        test: /\.(jpe?g|gif|png|eot|svg|woff|woff2|ttf)$/,
        use: 'file-loader'
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: 'ts-loader'
      },
      {
        test: /\.pug/,
        use: [
          'raw-loader',
          'pug-html-loader'
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(conf.paths.tmp),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    new ExtractTextPlugin({ // define where to save the file
      filename: '[name].css',
      allChunks: true
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: conf.path.src('index.pug'),
      minify:{
        removeComments:true
      }
    }),
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)(@angular|esm5)/,
      conf.paths.src
    ),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"'
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        resolve: {},
        ts: {
          configFile: 'tsconfig.json'
        },
        tslint: {
          configuration: require('../tslint.json')
        }
      },
      debug: true
    })
  ],
  // devtool: 'source-map',
  output: {
    path: path.join(process.cwd(), conf.paths.tmp),
    filename: '[name].js',
  },
  resolve: {
    extensions: [
      '.webpack.js',
      '.web.js',
      '.js',
      '.ts'
    ]
  },
  entry: [
    `./${conf.path.src('polyfills')}`,
    `./${conf.path.src('environments/development')}`,
    `./${conf.path.src('main')}`,
    `./${conf.path.src('assets/plugins')}`,
    `./${conf.path.src('assets/scss/styles.scss')}`,
  ]
};
