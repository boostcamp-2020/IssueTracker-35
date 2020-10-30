const expressLoader = require('./express');
const lastErrorHandler = require('./errorHandler');
const sequelizeLoader = require('./sequelize');

exports.init = app => {
  expressLoader(app);
  lastErrorHandler(app);
  sequelizeLoader();
};
