const passport = require('passport');
const { errorHandler } = require('@/utils/handler');
const { commentService, issueService } = require('@/services');

exports.passportAuthenticate = passport.authenticate('custom-github', {
  session: false,
});

exports.authenticateUser = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    try {
      if (err) {
        throw err; // 토큰 값 자체를 해석할 수 없는 경우
      }
      if (!user) {
        return errorHandler(res, 401, 'Unauthorized'); // 토큰 값으로 부터 유저를 찾을 수 없는 경우
      }
      req.user = user;
      return next();
    } catch (err) {
      console.log(err);
      next(err);
    }
  })(req, res, next);
};

exports.isValidIssueID = async (req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  const { issueID } = req.params;
  if (!issueID) {
    return next(err);
  }
  const issue = await issueService.retrieveById(issueID);
  if (!issue) {
    return next(err);
  }
  req.body.issue = issue;
  next();
};

exports.isValidCommentID = async (req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  const { commentID } = req.params;
  if (!commentID || (await commentService.getById(commentID))) {
    return next(err);
  }
  next();
};
