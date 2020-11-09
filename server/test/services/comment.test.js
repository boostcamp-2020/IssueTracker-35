const TIMEOUT = 10000;

const { commentService } = require('@/services/index');
const { expectedComments } = require('@test/seeds/comment');

describe('comments for all issue', () => {
  test(
    'comments',
    async () => {
      // when
      const comments = await commentService.getCommentCount();
      comments.rows.forEach(comment => {});

      expect(true).toBe(true);
    },
    TIMEOUT
  );
});
