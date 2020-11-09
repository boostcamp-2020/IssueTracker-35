const { Issue } = require('@/models');

const issues = [
  {
    id: 1,
    title: '첫 번째 이슈입니다.',
    is_open: true,
    user_id: 1,
  },
  {
    id: 2,
    title: '두 번째 이슈입니다.',
    is_open: true,
    milestone_id: 1,
    user_id: 1,
  },
  {
    id: 3,
    title: '세 번째 이슈입니다.',
    is_open: true,
    user_id: 1,
  },
  {
    id: 4,
    title: '제목입니당 ㅎㅎ',
    is_open: true,
    user_id: 1,
  },
];

const expectedIssue = issues[3];

const issueIds = new Set();
issues.forEach(issue => issueIds.add(issue.id));

const initIssues = async () => {
  await Issue.bulkCreate(issues);
};

const finiIssues = async () => {
  await Issue.destroy({ where: {} });
};

module.exports = { initIssues, finiIssues, expectedIssue, issueIds };
