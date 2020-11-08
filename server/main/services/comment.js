const { Comment } = require('@/models');
const { fn, col } = require('sequelize');
class CommentService {
  constructor(Comment) {
    this.Comment = Comment;
  }

  async getCommentCount() {
    const comments = await this.Comment.findAndCountAll({
      attributes: ['issue_id', [fn('COUNT', col('id')), 'comment_count']],
      where: { is_issue: false },
      group: 'issue_id',
    });
    return comments;
  }
}

module.exports = new CommentService(Comment);
