const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  entry: [
    'eventsource-polyfill', // necessary for hot reloading with IE
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loaders: [
          'babel-loader',
          'ts-loader',
        ],
      },
      {
        test: /\.js?/,
        exclude: [/node_modules/, /styles/],
        loaders: ['babel-loader'],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader'
      }
    ]
  }
};
