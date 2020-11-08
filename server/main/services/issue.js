const { Issue, User, Milestone } = require('@/models');

class IssueService {
  constructor(Issue) {
    this.Issue = Issue;
  }

  async retrieveAll() {
    const issues = await this.Issue.findAll({
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
