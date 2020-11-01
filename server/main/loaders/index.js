const expressLoader = require('@/loaders/express');
const lastErrorHandler = require('@/loaders/errorHandler');
const sequelizeLoader = require('@/loaders/sequelize');

exports.init = app => {
  expressLoader(app);
  lastErrorHandler(app);
  sequelizeLoader();
};
