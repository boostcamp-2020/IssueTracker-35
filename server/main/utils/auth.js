const jwt = require('jsonwebtoken');

exports.createJWT = user => {
  const { id, nickname } = user;
  return jwt.sign({ id, nickname }, process.env.JWT_SECRET);
};
