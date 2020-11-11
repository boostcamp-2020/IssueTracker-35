const { Issue, User, Milestone } = require('@/models');

class IssueService {
  constructor(Issue) {
    this.Issue = Issue;
  }

  async retrieveAll() {
    try {
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
    } catch (err) {
      throw Error(err);
    }
  }
  async createIssue(title, userID, milestoneID = null, transaction) {
    try {
      const result = await this.Issue.create(
        {
          title: title,
          is_open: true,
          milestone_id: milestoneID,
          user_id: userID,
        },
        { transaction: transaction }
      );

      return result.id;
    } catch (err) {
      throw Error(err);
    }
  }
}

module.exports = new IssueService(Issue);
