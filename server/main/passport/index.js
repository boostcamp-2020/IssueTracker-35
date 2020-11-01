const customGithub = require('@/passport/customStrategy');

module.exports = passport => {
  customGithub(passport);
};
