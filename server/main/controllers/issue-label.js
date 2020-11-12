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
}

module.exports = new IssueLabelController();
