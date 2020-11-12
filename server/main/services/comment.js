const { Comment, User } = require('@/models');
const { fn, col } = require('sequelize');
class CommentService {
  constructor(Comment) {
    this.Comment = Comment;
  }

  async getCommentCount() {
    try {
      const comments = await this.Comment.findAndCountAll({
        attributes: ['issue_id', [fn('COUNT', col('id')), 'comment_count']],
        where: { is_issue: false },
        group: 'issue_id',
      });
      return comments;
    } catch (err) {
      throw Error(err);
    }
  }
  async getCommentsByIssueID(issueID) {
    try {
      const comments = await this.Comment.findAll({
        attributes: ['id', 'content', 'createdAt'],
        include: [
          {
            model: User,
            attributes: ['id', 'nickname', 'image'],
            order: [['createdAt', 'DESC']],
          },
        ],
        where: { issue_id: issueID },
        required: false,
      });
      return comments;
    } catch (err) {
      throw Error(err);
    }
  }
  async createIssue(content, issueID, userID, transaction) {
    try {
      const result = await this.Comment.create(
        {
          is_issue: true,
          content: content,
          issue_id: issueID,
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

module.exports = new CommentService(Comment);
