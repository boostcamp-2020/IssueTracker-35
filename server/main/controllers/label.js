const { responseHandler } = require('@/utils/handler');
const { labelService } = require('@/services/index');

class LabelController {
  async getAllLabels(req, res, next) {
    try {
      const labels = await labelService.getAllLabels();
      responseHandler(res, 200, { labels });
    } catch (err) {
      next(err);
    }
  }

  async createLabel(req, res, next) {
    try {
      const { title, content, color } = req.body;
      const label = await labelService.create({ title, content, color });

      responseHandler(res, 200, { id: label.id });
    } catch (err) {
      next(err);
    }
  }

  isValidToCreate(req, res, next) {
    const { title, content, color } = req.body;
    const err = new Error('Bad Request');
    err.status = 400;

    if (!title || typeof title !== 'string') {
      return next(err);
    }
    if (typeof content !== 'string') {
      return next(err);
    }
    if (!color || typeof color !== 'string') {
      return next(err);
    }
    next();
  }
}

module.exports = new LabelController();
