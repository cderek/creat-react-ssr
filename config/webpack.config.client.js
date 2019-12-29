const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.js');
const HTMLPlugin = require('html-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

const config = webpackMerge(webpackBaseConfig, {
  entry: {
    app: path.join(__dirname, '../src/app.js'),
  },
  output: {
    filename: '[name].[hash].js',
  },
  plugins: [
    new HTMLPlugin({
      template: path.join(__dirname, '../src/template.html'),
    }),
  ],
});

if (isDev) {
  config.entry = {
    app: ['react-hot-loader/patch', path.join(__dirname, '../src/app.js')],
  };
  config.devServer = {
    host: '0.0.0.0',
    port: '8000',
    contentBase: path.join(__dirname, '../dist'),
    hot: true,
    overlay: {
      errors: true,
    },
    publicPath: '/public/',
    historyApiFallback: {
      index: '/public/index.html',
    },
  };
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = config;
