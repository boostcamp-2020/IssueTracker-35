const customStrategy = require('passport-custom').Strategy;
const { User } = require('../models');

const githubVerify = async (req, done) => {};

module.exports = passport => {
  passport.use('custom-github', new customStrategy(githubVerify));
};
