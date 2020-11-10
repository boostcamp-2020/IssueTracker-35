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
        group: ['id', 'issue_id'],
        required: false,
      });
      return labels;
    } catch (err) {
      throw Error(err);
    }
  }
  async create(issueID, labels) {
    try {
      const bulkData = [];
      labels.forEach(labelID =>
        bulkData.push({ issue_id: issueID, label_id: labelID })
      );

      const result = await this.IssueLabel.bulkCreate(bulkData);
      return result ? true : false;
    } catch (err) {
      throw Error(err);
    }
  }
}

module.exports = new IssueLabelService(IssueLabel);
