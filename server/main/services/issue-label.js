const { IssueLabel, Label } = require('@/models');

class IssueLabelService {
  constructor(IssueLabel) {
    this.IssueLabel = IssueLabel;
  }

  async getLabels() {
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
  }
}

module.exports = new IssueLabelService(IssueLabel);
