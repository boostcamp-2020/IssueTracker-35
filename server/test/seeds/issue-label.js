const { IssueLabel } = require('@/models');

const expectedIssueLabels = [
  {
    id: 1,
    issue_id: 2,
    label_id: 1,
  },
  {
    id: 2,
    issue_id: 3,
    label_id: 2,
  },
];

const initIssueLabels = async () => {
  await IssueLabel.bulkCreate(expectedIssueLabels);
};

const finiIssueLabels = async () => {
  await IssueLabel.destroy({ where: {} });
};

module.exports = { initIssueLabels, finiIssueLabels, expectedIssueLabels };
