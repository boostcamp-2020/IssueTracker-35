const passport = require('passport');
const { errorHandler } = require('@/utils/handler');

exports.passportAuthenticate = passport.authenticate('custom-github', { session: false });

exports.authenticateUser = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    try {
      if (err || !user) return errorHandler(res, 401, 'Unauthorized');
      if (user) {
        req.user = user;
        return next();
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  })(req, res, next);
};
