const { Assignment, User } = require('@/models');

class AssignmentService {
  constructor(Assignment) {
    this.Assignment = Assignment;
  }

  async getAssignees() {
    const Assignees = await this.Assignment.findAll({
      include: [
        {
          model: User,
          attributes: ['nickname', 'image'],
        },
      ],
      group: 'issue_id',
      required: false,
    });
    return Assignees;
  }
}

module.exports = new AssignmentService(Assignment);
