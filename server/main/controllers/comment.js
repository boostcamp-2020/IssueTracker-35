const { responseHandler } = require('@/utils/handler');
const { commentService } = require('@/services');

class CommentController {
  constructor() {
    this.createComment = this.createComment.bind(this);
    this.updateComment = this.updateComment.bind(this);
  }

  validate(body) {
    const err = new Error('Bad Request');
    err.status = 400;

    if (!body || typeof body.content !== 'string') return err;
  }

  async createComment(req, res, next) {
    const err = this.validate(req.body);
    if (err) return next(err);
    const id = await commentService.create(
      req.body.content,
      req.params.issueID,
      req.user.id
    );

    responseHandler(res, 201, { id });
  }

  async updateComment(req, res, next) {
    const err = this.validate(req.body);
    if (err) return next(err);
    await commentService.update(req.body.content, req.params.commentID);
    responseHandler(res, 200);
  }
}

module.exports = new CommentController();
