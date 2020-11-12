const { responseHandler } = require('@/utils/handler');
const { commentService } = require('@/services');

const { convertObjectKeys } = require('@/utils/api');
const { sequelize } = require('@/models');

class CommentController {
  async createComment(req, res, next) {
    const err = new Error('Bad Request');
    err.status = 400;

    if (!req.body && typeof req.body.content !== 'string') return next(err);
    responseHandler(res, 200, {});
  }

  async updateComment(req, res, next) {
    responseHandler(res, 200, {});
  }
}

module.exports = new CommentController();
