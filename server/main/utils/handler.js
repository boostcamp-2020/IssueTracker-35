exports.errorHandler = (res, code, message = '') => {
  res.status(code).json({
    code,
    message,
  });
};

exports.responseHandler = (res, code, result = { success: true }) => {
  res.status(code).json({
    code,
    success: true,
    ...result,
  });
};
