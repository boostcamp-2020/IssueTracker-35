const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 12;

exports.hashingPw = password => bcrypt.hash(password, saltRounds);

exports.comparePw = (password, dbPassword) => bcrypt.compare(password, dbPassword);

exports.createJWT = user => {
  const { id, nickname } = user;
  return jwt.sign({ id, nickname }, process.env.JWT_SECRET);
};
