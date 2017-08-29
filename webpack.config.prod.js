const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

process.env.NODE_ENV = 'production';
const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production')
};
module.exports = {
  devtool: 'source-map',
  entry: `${__dirname}/client/Index.jsx`,
  target: 'web',
  output: {
    path: `${__dirname}/dist`,
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: `${__dirname}/client`
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        include:
        `${__dirname}/client`,
        loaders: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: [
            'react-html-attrs',
            'transform-class-properties',
            'transform-decorators-legacy'
          ]
        }
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          // resolve-url-loader may be chained before sass-loader if necessary
          use: ['css-loader', 'sass-loader']
        })
      },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.(jpg|png|svg)$/, loader: 'url-loader' },
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: false
    }),
    new webpack.DefinePlugin(GLOBALS),
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin({
      filename: './css/style.css',
      allChunks: true
    }),
    new CopyWebpackPlugin([
      { from: './client/index.html' }
    ])
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  node: {
    net: 'empty',
    dns: 'empty'
  }
};
