const { errorHandler } = require('../utils/handler');

const lastErrorHandler = app => {
  app.use((req, res, next) => {
    next(Error(404));
  });

  app.use((err, req, res, next) => {
    errorHandler(res, err.status || 500, err.message);
  });
};

module.exports = lastErrorHandler;
