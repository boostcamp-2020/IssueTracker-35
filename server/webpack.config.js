const path = require('path');
module.exports = {
  entry: './main/bin/www',
  module: {
    rules: [
      {
        exclude: /node_modules/
      }
    ]
  },
  devtool: 'source-map',
  target: 'node',
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
    alias: {
      '@main': path.resolve(__dirname, './main'),
    },
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};