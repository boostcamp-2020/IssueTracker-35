const { responseHandler } = require('@/utils/handler');
const { assignmentService } = require('@/services/index');
const { sequelize } = require('@/models');

class AssignmentController {
  async amendAssignments(req, res, next) {
    const transaction = await sequelize.transaction();
    try {
      const { issueID } = req.params;
      const { assignees } = req.body;

      await assignmentService.removeAllByIssueID(issueID, transaction);
      await assignmentService.create(issueID, assignees, transaction);

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

    const { assignees } = req.body;
    const { issueID } = req.params;

    if (!issueID || isNaN(parseInt(issueID))) {
      return next(err);
    }
    if (!assignees || !Array.isArray(assignees)) {
      return next(err);
    }
    if (assignees.some(label => typeof label !== 'number')) {
      return next(err);
    }
    next();
  }
}

module.exports = new AssignmentController();
