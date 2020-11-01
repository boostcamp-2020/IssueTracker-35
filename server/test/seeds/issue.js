require('module-alias/register');
const { Issue } = require('@/server/models');

const expectedIssue = {
  id: 4,
  title: '제목입니당 ㅎㅎ',
  content: '내용~~ 내용~~',
  is_open: true,
  user_id: 1,
};

const issueIds = new Set();

const initIssues = () => {
  const issues = [
    {
      id: 1,
      title: '첫 번째 이슈입니다.',
      content: '첫 번째 내용~~',
      is_open: true,
      user_id: 1,
    },
    {
      id: 2,
      title: '두 번째 이슈입니다.',
      content: '두 번째 내용~~',
      is_open: true,
      user_id: 1,
    },
    {
      id: 3,
      title: '세 번째 이슈입니다.',
      content: '세 번째 내용~~',
      is_open: true,
      user_id: 1,
    },
  ];
  issues.forEach(issue => issueIds.add(issue.id));

  Issue.destory({ where: {} });
  Issue.bulkCreate(issues);
};

module.exports = { initIssues, expectedIssue, issueIds };
