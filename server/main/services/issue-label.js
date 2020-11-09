const { IssueLabel, Label } = require('@/models');

class IssueLabelService {
  constructor(IssueLabel) {
    this.IssueLabel = IssueLabel;
  }

  async getLabels() {
    try {
      const labels = await this.IssueLabel.findAll({
        include: [
          {
            model: Label,
            attributes: ['title', 'color'],
          },
        ],
        group: 'issue_id',
        required: false,
      });
      return labels;
    } catch (err) {
      throw Error(err);
    }
  }
}

module.exports = new IssueLabelService(IssueLabel);
