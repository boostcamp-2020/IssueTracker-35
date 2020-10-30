const customGithub = require('./customStrategy');

module.exports = passport => {
  customGithub(passport);
};
