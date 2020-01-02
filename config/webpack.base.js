const path = require('path');

module.exports = {
  output: {
    path: path.join(__dirname, '../dist'),
    publicPath: '/public/',
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /.(js)$/,
        loader: 'eslint-loader',
        exclude: [path.resolve(__dirname, '../node_modules')],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      {
        test: /.js$/,
        loader: 'babel-loader',
        exclude: [path.join(__dirname, '../node_modules')],
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
  },
};
