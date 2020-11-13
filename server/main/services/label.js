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
  async create(data) {
    try {
      const result = await this.Label.create(data);
      return result;
    } catch (err) {
      throw Error(err);
    }
  }
  async remove(labelID) {
    try {
      const result = await this.Label.destroy({ where: { id: labelID } });
      return result;
    } catch (err) {
      throw Error(err);
    }
  }
}

module.exports = new LabelService(Label);
