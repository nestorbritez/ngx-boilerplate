const webpack = require('webpack');
const conf = require('./gulp.conf');
const autoprefixer = require('autoprefixer');

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
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)(@angular|esm5)/,
      conf.paths.src
    ),
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
  devtool: 'source-map',
  resolve: {
    extensions: [
      '.webpack.js',
      '.web.js',
      '.js',
      '.ts'
    ]
  }
};
