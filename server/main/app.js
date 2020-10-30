const loader = require('./loaders');
const express = require('express');

const startServer = () => {
  const app = express();
  loader.init(app);

  module.exports = app;
};

startServer();
