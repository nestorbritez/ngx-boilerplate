const webpack = require('webpack');
const conf = require('./gulp.conf');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const extractSass = new ExtractTextPlugin({
  filename: 'main-[hash].css',
  disable: process.env.NODE_ENV === 'development'
});

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
        exclude: /\.component\.scss/,
        use: extractSass.extract({
          use: ['css-loader?minimize', 'sass-loader']
        })
      },
      {
        test: /\.component\.scss$/,
        use: ['to-string-loader', 'style-loader', 'css-loader?minimize', 'sass-loader']
      },
      {
        test: /\.scss/,
        use: {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss',
            plugins: () => [autoprefixer]
          }
        }
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
        use: ['raw-loader', 'pug-html-loader']
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(conf.paths.dist, {
      root: process.cwd(),
      verbose: true
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default']
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: conf.path.src('index.pug')
    }),
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)(@angular|esm5)/,
      conf.paths.src
    ),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new webpack.optimize.UglifyJsPlugin({
      output: {comments: false},
      compress: {unused: true, dead_code: true, warnings: false} // eslint-disable-line camelcase
    }),
    extractSass,
    new webpack.optimize.CommonsChunkPlugin({name: 'vendor'}),
    new webpack.LoaderOptionsPlugin({
      options: {
        resolve: {},
        ts: {
          configFile: 'tsconfig.json'
        },
        tslint: {
          configuration: require('../tslint.json')
        },
        css: {
          url: false
        }
      }
    })
  ],
  output: {
    path: path.join(process.cwd(), conf.paths.dist),
    filename: '[name]-[hash].js'
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
    `./${conf.path.src('environments/production')}`,
    `./${conf.path.src('main')}`,
    `./${conf.path.src('assets/plugins')}`,
    `./${conf.path.src('assets/scss/styles.scss')}`
  ]
};
