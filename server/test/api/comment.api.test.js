/* eslint-disable jest/no-done-callback */
const request = require('supertest');
const app = require('@/app');
const { createJWT } = require('@/utils/auth');
const { users } = require('@test/seeds/user');
const { expectedComments } = require('@test/seeds/comment');
const { Comment } = require('@/models');
const { status } = require('@test/api/response-status');

describe('create comment', () => {
  const CREATE_URL = issueId => `/issues/${issueId}/comments`;

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
          expect(code).toBe(status.code.CREATED);
          const receivedComment = await Comment.findByPk(id, {
            attributes: { exclude: ['createdAt', 'updatedAt'] },
          });
          expect(receivedComment.dataValues).toStrictEqual({
            id,
            is_issue: false,
            content: comment.content,
            user_id: users[INDEX.user].id,
            issue_id: expectedComments[INDEX.comment].id,
          });
          await Comment.destroy({ where: { id } });
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
          expect(code).toBe(status.code.BAD_REQUEST);
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
        .set('Authorization', createJWT(users[INDEX.user]))
        .send({ content: [1, 3] })
        .end((err, res) => {
          if (err) throw err;
          const { code } = res.body;
          expect(code).toBe(status.code.BAD_REQUEST);
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
          expect(code).toBe(status.code.UNAUTHORIZED);
          done();
        });
    } catch (err) {
      done(err);
    }
  });
});

describe('Update comment', () => {
  const UPDATE_URL = id => `/comments/${id}`;
  const getOwner = user_id => users.find(user => user.id === user_id);

  // given
  const INDEX = { comment: 0 };
  const comment = { content: '바뀌었지롱 ㅗ' };

  it('successfully', done => {
    try {
      // when
      const expectedComment = {
        ...expectedComments[INDEX.comment],
        ...comment,
      };
      const { id } = expectedComment;
      request(app)
        .patch(UPDATE_URL(id))
        .set('Authorization', createJWT(getOwner(expectedComment.user_id)))
        .send(comment)
        .end(async (err, res) => {
          // then
          if (err) throw err;
          const { code } = res.body;
          expect(code).toBe(status.code.SUCCESS);
          const receivedComment = await Comment.findByPk(id, {
            attributes: { exclude: ['createdAt', 'updatedAt'] },
          });
          expect(receivedComment.dataValues).toStrictEqual(expectedComment);
          done();
        });
    } catch (err) {
      done(err);
    }
  });

  it('without content -> 400 Bad request', done => {
    const expectedComment = expectedComments[INDEX.comment];
    try {
      request(app)
        .patch(UPDATE_URL(expectedComment.id))
        .set('Authorization', createJWT(getOwner(expectedComment.user_id)))
        .end((err, res) => {
          if (err) throw err;
          const { code } = res.body;
          expect(code).toBe(status.code.BAD_REQUEST);
          done();
        });
    } catch (err) {
      done(err);
    }
  });

  it('with wrong ID -> 404 Not Found', done => {
    try {
      request(app)
        .patch(UPDATE_URL('ASDF'))
        .set('Authorization', createJWT(getOwner(users[0].id)))
        .end((err, res) => {
          if (err) throw err;
          const { code } = res.body;
          expect(code).toBe(status.code.NOT_FOUND);
          done();
        });
    } catch (err) {
      done(err);
    }
  });

  it('by someone else -> 403 Forbidden', done => {
    const expectedComment = expectedComments[INDEX.comment];
    try {
      request(app)
        .patch(UPDATE_URL(expectedComment.id))
        .set(
          'Authorization',
          createJWT(users.find(user => user.id !== expectedComment.user_id))
        )
        .end((err, res) => {
          if (err) throw err;
          const { code } = res.body;
          expect(code).toBe(status.code.FORBIDDEN);
          done();
        });
    } catch (err) {
      done(err);
    }
  });
});
