const { responseHandler } = require('@/utils/handler');
const { issueService, issueLabelService } = require('@/services/index');
const { sequelize } = require('@/models');

class IssueLabelController {
  async amendIssueLabels(req, res, next) {
    const transaction = await sequelize.transaction();
    try {
      const { issueID } = req.params;
      const { labels } = req.body;

      await issueLabelService.removeAllByIssueID(issueID, transaction);
      await issueLabelService.create(issueID, labels, transaction);

      await transaction.commit();
      responseHandler(res, 200);
    } catch (err) {
      console.log(err);
      await transaction.rollback();
      next(err);
    }
  }
  async isValidIssueID(req, res, next) {
    const err = new Error('Bad Request');
    err.status = 400;
    const { issueID } = req.params;
    if (!issueID) {
      return next(err);
    }
    const issue = await issueService.retrieveById(issueID);
    if (!issue) {
      return next(err);
    }

    next();
  }
}

module.exports = new IssueLabelController();
