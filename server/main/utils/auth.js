const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 12;
const TOKEN_HEADER = 'Bearer ';

exports.DEFAULT_PROFILE_IMAGE_URL =
  'https://user-images.githubusercontent.com/49153756/98246728-0696ff00-1fb6-11eb-8303-162a5bc3581b.png';

exports.hashingPw = password => bcrypt.hash(password, saltRounds);

exports.comparePw = (password, dbPassword) =>
  bcrypt.compare(password, dbPassword);

exports.createJWT = user => {
  const { id, nickname, image } = user;

  return `${TOKEN_HEADER}${jwt.sign(
    { id, nickname, image },
    process.env.JWT_SECRET
  )}`;
};
