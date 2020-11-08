const { Label } = require('@/models');

class LabelService {
  constructor(Label) {
    this.Label = Label;
  }

  async getTotalCount() {
    const labelCount = await this.Label.count({});
    return labelCount;
  }
}

module.exports = new LabelService(Label);
