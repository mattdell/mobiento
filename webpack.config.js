require('dotenv').config();

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const requiredEnvironmentVariables = [
  'NODE_ENV',
  'UNSPLASH_CLIENT_ID',
];

requiredEnvironmentVariables.forEach((variable) => {
  if (!process.env[variable]) {
    console.error(`Required environment variable ${variable} not found`);
    process.exit(1);
  }
});

const configuration = {
  devServer: {
    stats: 'errors-only',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  entry: [
    'eventsource-polyfill', // necessary for hot reloading with IE
    './src/index',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.PORT': JSON.stringify(process.env.PORT),
      'process.env.UNSPLASH_CLIENT_ID': JSON.stringify(process.env.UNSPLASH_CLIENT_ID),
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
        include: path.join(__dirname, 'src'),
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader?modules!sass-loader',
      },
    ],
  },
};

// Environment specific configuration
const { NODE_ENV: environment } = process.env;
if (environment === 'production') {
  configuration.plugins.push(
    new webpack.optimize.UglifyJsPlugin()
  );
  configuration.plugins.push(
    new HtmlWebpackPlugin({
      template: './index.html',
    })
  );
}

if (environment === 'development') {
  configuration.devtool = 'source-map';
}

module.exports = configuration;
