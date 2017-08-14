const webpack = require('webpack');
const path = require('path');

const config = {
  devtool: 'inline-source-map',
  entry: './client/Index.jsx',
  output: {
    path: `${__dirname}/client`,
    publicPath: '/',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.jsx', '.js']
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: path.join(__dirname, 'client'),
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
};
module.exports = config;
