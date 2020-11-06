const { Issue, User, Assignment } = require('@/models');

class IssueService {
  constructor(Issue) {
    this.Issue = Issue;
  }

  async retrieveAll() {
    const issues = await this.Issue.findAll({
      as: 'issue',
      where: { id: '$assignment.issue_id$' },
      include: [
        {
          model: User,
          attributes: ['nickname'],
        },
        {
          model: Assignment,
          attributes: ['assignee'],
          as: 'assignment',
        },
      ],
    });
    return issues;
  }
}

module.exports = new IssueService(Issue);
