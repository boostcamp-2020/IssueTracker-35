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
}

module.exports = new LabelService(Label);
