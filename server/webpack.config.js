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
      '@controllers': path.resolve(__dirname, './main/controllers'),
      '@loaders': path.resolve(__dirname, './main/loaders'),
      '@models': path.resolve(__dirname, './main/models'),
      '@routes': path.resolve(__dirname, './main/routes'),
      '@services': path.resolve(__dirname, './main/services'),
      '@utils': path.resolve(__dirname, './main/utils'),
    },
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};