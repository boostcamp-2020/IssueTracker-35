const { Label } = require('@/models');

class LabelService {
  constructor(Label) {
    this.Label = Label;
  }

  async getTotalCount() {
    try {
      const labelCount = await this.Label.count({});
      return labelCount;
    } catch (err) {
      throw Error(err);
    }
  }
  async getAllLabels() {
    try {
      const labels = await this.Label.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      });
      return labels;
    } catch (err) {
      throw Error(err);
    }
  }
}

module.exports = new LabelService(Label);
