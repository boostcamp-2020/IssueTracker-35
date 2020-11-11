const { Assignment, User } = require('@/models');

class AssignmentService {
  constructor(Assignment) {
    this.Assignment = Assignment;
  }

  async getAssignees() {
    try {
      const Assignees = await this.Assignment.findAll({
        include: [
          {
            model: User,
            attributes: ['nickname', 'image'],
          },
        ],
        group: ['id', 'issue_id'],
        required: false,
      });
      return Assignees;
    } catch (err) {
      throw Error(err);
    }
  }
  async create(issueID, assignees, transaction) {
    try {
      const bulkData = [];
      assignees.forEach(assignee => {
        bulkData.push({ issue_id: issueID, assignee: assignee });
      });

      const result = await this.Assignment.bulkCreate(bulkData, {
        transaction: transaction,
      });

      return result ? true : false;
    } catch (err) {
      throw Error(err);
    }
  }
}

module.exports = new AssignmentService(Assignment);
