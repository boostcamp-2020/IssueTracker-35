const { errorHandler } = require('../utils/handler');

const lastErrorHandler = app => {
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  app.use((err, req, res, next) => {
    errorHandler(res, err.status || 500, err.message);
  });
};

module.exports = lastErrorHandler;
