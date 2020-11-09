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
