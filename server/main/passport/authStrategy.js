const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const userService = require('@/services/user');

const jwtConfig = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('authorization'),
  secretOrKey: process.env.JWT_SECRET,
};

const jwtVerify = async (payload, done) => {
  try {
    const user = await userService.retrieveById(payload.id);
    if (user) done(null, user.dataValues);
    else done(null, false);
  } catch (error) {
    console.log(error);
    done(error);
  }
};

module.exports = passport => {
  passport.use('jwt', new JWTStrategy(jwtConfig, jwtVerify));
};
