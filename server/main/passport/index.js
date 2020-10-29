const passport = require('passport');
const customGithub = require('./customStrategy');

module.exports = passport => {
  customGithub(passport);
};
