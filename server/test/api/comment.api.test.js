/* eslint-disable jest/no-done-callback */
const request = require('supertest');
const app = require('@/app');
const { createJWT } = require('@/utils/auth');
const { users } = require('@test/seeds/user');
const { expectedComments } = require('@test/seeds/comment');
const { Comment } = require('@/models');

const CODE = {
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
};

describe('create comment', () => {
  const CREATE_URL = issueId => `/issues/:${issueId}/comments`;

  // given
  const comment = {
    content: 'bla bla bla bla',
  };
  const INDEX = { comment: 0, user: 1 };

  it('successfully', done => {
    try {
      // when
      request(app)
        .post(CREATE_URL(expectedComments[INDEX.comment].issue_id))
        .set('Authorization', createJWT(users[INDEX.user]))
        .send(comment)
        .end(async (err, res) => {
          // then
          if (err) throw err;
          const { id, code } = res.body;
          expect(code).toBe(CODE.CREATED);
          const receivedComment = await Comment.findByPk(id);
          expect(receivedComment).toStrictEqual({
            id,
            is_issue: false,
            content: comment.content,
            user_id: users[INDEX.user].id,
            issue_id: expectedComments[INDEX.comment].id,
          });
          done();
        });
    } catch (err) {
      done(err);
    }
  });

  it('without content -> 400 Bad request', done => {
    try {
      request(app)
        .post(CREATE_URL(expectedComments[INDEX.comment].issue_id))
        .set('Authorization', createJWT(users[INDEX.user]))
        .end((err, res) => {
          if (err) throw err;
          const { code } = res.body;
          expect(code).toBe(CODE.BAD_REQUEST);
          done();
        });
    } catch (err) {
      done(err);
    }
  });

  it('with invalid content -> 400 Bad request', done => {
    try {
      request(app)
        .post(CREATE_URL(expectedComments[INDEX.comment].issue_id))
        .send({ content: [1, 3] })
        .end((err, res) => {
          if (err) throw err;
          const { code } = res.body;
          expect(code).toBe(CODE.BAD_REQUEST);
          done();
        });
    } catch (err) {
      done(err);
    }
  });

  it('with invalid token -> 401 Unauthorized', done => {
    try {
      request(app)
        .post(CREATE_URL(expectedComments[INDEX.comment].issue_id))
        .send(comment)
        .end((err, res) => {
          if (err) throw err;
          const { code } = res.body;
          expect(code).toBe(CODE.UNAUTHORIZED);
          done();
        });
    } catch (err) {
      done(err);
    }
  });
});
