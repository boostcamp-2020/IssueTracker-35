const customGithub = require('@/passport/customStrategy');
const authUser = require('@/passport/authStrategy');

module.exports = passport => {
  customGithub(passport);
  authUser(passport);
};
