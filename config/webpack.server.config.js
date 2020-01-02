const path = require('path');
const webpackMerge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.js');

module.exports = webpackMerge(webpackBaseConfig, {
  target: 'node',
  entry: {
    app: path.join(__dirname, '../src/server-entry.js'),
  },
  output: {
    filename: 'server-entry.js',
    libraryTarget: 'commonjs2',
  },
});
