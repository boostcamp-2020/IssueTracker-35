const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 12;
const TOKEN_HEADER = 'Bearer ';

exports.hashingPw = password => bcrypt.hash(password, saltRounds);

exports.comparePw = (password, dbPassword) => bcrypt.compare(password, dbPassword);

exports.createJWT = user => {
  const { id, nickname, image } = user;
  return `${TOKEN_HEADER}${jwt.sign({ id, nickname, image }, process.env.JWT_SECRET)}`;
};
