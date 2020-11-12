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
}

module.exports = new LabelController();
