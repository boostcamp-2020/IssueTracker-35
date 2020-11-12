const { responseHandler } = require('@/utils/handler');
const { issueLabelService } = require('@/services/index');
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
      await transaction.rollback();
      next(err);
    }
  }

  async isValidReqeustData(req, res, next) {
    const err = new Error('Bad Request');
    err.status = 400;

    const { labels } = req.body;
    const { issueID } = req.params;
    if (!issueID || isNaN(parseInt(issueID))) {
      return next(err);
    }
    if (!labels || !Array.isArray(labels)) {
      return next(err);
    }
    if (labels.some(label => typeof label !== 'number')) {
      return next(err);
    }
    next();
  }
}

module.exports = new IssueLabelController();
