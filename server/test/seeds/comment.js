const { Comment } = require('@/models');

const expectedComments = [
  {
    id: 1,
    content: '첫 번째 이슈 내용~!!',
    is_issue: true,
    issue_id: 1,
    user_id: 1,
  },
  {
    id: 2,
    content: '두 번째 이슈 내용~!!',
    is_issue: true,
    issue_id: 2,
    user_id: 1,
  },
  {
    id: 3,
    content: '세 번째 이슈 내용~!!',
    is_issue: true,
    issue_id: 3,
    user_id: 1,
  },
  {
    id: 4,
    content: '두 번째 이슈에 대한 댓글!!!!#!',
    is_issue: false,
    issue_id: 2,
    user_id: 2,
  },
  {
    id: 5,
    content: '세 번째 이슈에 대한 댓글!!!!#!',
    is_issue: false,
    issue_id: 3,
    user_id: 2,
  },
  {
    id: 6,
    content: '세 번째 이슈에 대한 댓글222!!!!#!',
    is_issue: false,
    issue_id: 3,
    user_id: 1,
  },
];

const commentIds = new Set();
expectedComments.forEach(comment => commentIds.add(comment.id));

const initComments = async () => {
  await Comment.bulkCreate(expectedComments);
};

const finiComments = async () => {
  await Comment.destroy({ where: {} });
};

module.exports = { initComments, finiComments, expectedComments, commentIds };
