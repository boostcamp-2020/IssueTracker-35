const { Issue, User, Milestone } = require('@/models');

class IssueService {
  constructor(Issue) {
    this.Issue = Issue;
  }

  async retrieveAll() {
    const issues = await this.Issue.findAll({
      attributes: {
        exclude: ['milestone_id', 'user_id'],
      },
      include: [
        {
          model: User,
          attributes: ['nickname'],
        },
        {
          model: Milestone,
          attributes: ['title'],
        },
      ],
      required: false,
    });
    return issues;
  }
}

module.exports = new IssueService(Issue);
