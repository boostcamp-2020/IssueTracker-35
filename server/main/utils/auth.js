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

exports.decodeJWT = token => {
  return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    return err ? undefined : decoded; // err가 나면 undefined로 반환
  });
};

exports.isValidToken = tokenString => {
  return tokenString.startsWith(TOKEN_HEADER);
};
