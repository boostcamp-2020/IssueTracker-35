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
  async create(issueID, assignee) {
    try {
      const result = await this.Assignment.create({
        issue_id: issueID,
        assignee: assignee,
      });

      return result.id;
    } catch (err) {
      throw Error(err);
    }
  }
}

module.exports = new AssignmentService(Assignment);
