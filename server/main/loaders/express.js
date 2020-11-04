const express = require('express');
const path = require('path');
const logger = require('morgan');
const indexRouter = require('@/routes');
const passport = require('passport');
const cors = require('cors');
require('dotenv').config();
const passportConfig = require('@/passport');

const expressLoader = app => {
  app.use(logger('dev'));
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(
    cors({
      origin: true,
      credentials: true,
    })
  );
  app.use(passport.initialize());
  passportConfig(passport);

  app.use('/', indexRouter);
};

module.exports = expressLoader;
