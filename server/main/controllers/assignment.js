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
}

module.exports = new AssignmentController();
