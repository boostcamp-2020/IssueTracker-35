const TIMEOUT = 10000;

const { commentService } = require('@/services/index');
const { expectedComments } = require('@test/seeds/comment');

describe('comments for all issue', () => {
  test(
    'comments',
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
