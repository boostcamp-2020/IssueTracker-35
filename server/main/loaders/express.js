const express = require('express');
const path = require('path');
const logger = require('morgan');
const indexRouter = require('@routes');
require('dotenv').config();

const expressLoader = app => {
  app.use(logger('dev'));
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use('/', indexRouter);
};

module.exports = expressLoader;
