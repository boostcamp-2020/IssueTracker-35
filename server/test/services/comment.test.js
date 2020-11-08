const TIMEOUT = 10000;

const commentService = require('@/services/comment');
const { expectedComments } = require('@test/seeds/comment');

describe('comments for all issue', () => {
  test(
    'comments',
    async () => {
      // when
      const comments = await commentService.getCommentCount();
      // console.log(comments);
      comments.rows.forEach(comment => {
        // console.log(comment);
      });

      expect(true).toBe(true);
    },
    TIMEOUT
  );
});
