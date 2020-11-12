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
  async getLabelsByIssueId(issueID) {
    try {
      const labels = await this.IssueLabel.findAll({
        include: [{ model: Label, attributes: ['id', 'title', 'color'] }],
        where: { issue_id: issueID },
        required: false,
      });
      return labels;
    } catch (err) {
      throw Error(err);
    }
  }
  async create(issueID, labels, transaction) {
    try {
      const bulkData = [];
      labels.forEach(labelID =>
        bulkData.push({ issue_id: issueID, label_id: labelID })
      );

      const result = await this.IssueLabel.bulkCreate(bulkData, {
        transaction: transaction,
      });

      return result ? true : false;
    } catch (err) {
      throw Error(err);
    }
  }
  async removeAllByIssueID(issueID, transaction) {
    try {
      const result = await this.IssueLabel.destroy(
        {
          where: { issue_id: issueID },
        },
        { transaction: transaction }
      );

      return result;
    } catch (err) {
      throw Error(err);
    }
  }
}

module.exports = new IssueLabelService(IssueLabel);
