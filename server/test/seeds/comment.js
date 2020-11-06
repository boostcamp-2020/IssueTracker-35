const { Comment } = require('@/models');

const expectedComment = {
  id: 3,
  content: '세 번째 이슈 내용~!!',
  is_issue: true,
  issue_id: 3,
  user_id: 1,
};

const commentIds = new Set();

const initComments = async () => {
  const comments = [
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
  ];
  comments.forEach(comment => commentIds.add(comment.id));

  await Comment.bulkCreate(comments);
};

const finiComments = async () => {
  await Comment.destroy({ where: {} });
};

module.exports = { initComments, finiComments, expectedComment, commentIds };
