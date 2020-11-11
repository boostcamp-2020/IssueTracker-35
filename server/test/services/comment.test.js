const TIMEOUT = 10000;

const { commentService } = require('@/services/index');
const { expectedComments } = require('@test/seeds/comment');
const { users } = require('@test/seeds/user');

describe('retrieve comments', () => {
  test(
    'comments  for all issue',
    async () => {
      // when
      const comments = await commentService.getCommentCount();
      const issueID = comments.rows[0].issue_id;
      const resultCommentCount = comments.rows[0].dataValues.comment_count;

      const expectedCount = expectedComments.filter(
        data => data.issue_id === issueID && !data.is_issue
      ).length;
      //then
      expect(resultCommentCount).toBe(expectedCount);
    },
    TIMEOUT
  );
  test('comments for a issue with valid ID', async () => {
    //given
    const IssueID = 3;
    const expectedCommentIds = [3, 5, 6];
    const expectedUsersIds = [1, 2];

    //when
    const comments = await commentService.getCommentsByIssueID(IssueID);
    //then
    comments.forEach(comment => {
      expect(expectedCommentIds.includes(comment.id)).toBeTruthy();
      expect(expectedUsersIds.includes(comment.User.id)).toBeTruthy();
    });
  });
  test('comments for a issue with invalid ID', async () => {
    //given
    const IssueID = 99999;
    //when
    const comments = await commentService.getCommentsByIssueID(IssueID);
    //then
    expect(comments.length).toBe(0);
  });
});

describe('create comment', () => {
  test('create for issue with valid data', async () => {
    //given
    const issueID = 4;
    const content = '4번째 이슈에 대한 내용을 생성합니다!!';
    const userID = 1;

    //when
    const commentID = await commentService.createIssue(
      content,
      issueID,
      userID
    );

    //then
    expect(typeof commentID).toBe('number');
    expect(commentID).toBeGreaterThanOrEqual(expectedComments.length);
  });
});
