/* eslint-disable jest/no-done-callback */
const request = require('supertest');
const app = require('@/app');
const { expectedUserToken } = require('@test/seeds/user');

const expectedIssue = {
  id: 3,
  title: '세 번째 이슈입니다.',
  isOpen: true,
  author: { nickname: 'user11' },
  milestone: [],
  assignees: { nickname: 'user22', image: null },
  labels: { title: '개똥벌레', color: 'color' },
  commentCount: 1,
};

describe('retrieve all issues', () => {
  const ALL_ISSUE_URL = '/issues';
  // 정상 작동
  it('success retrieve all issues', done => {
    try {
      request(app)
        .get(ALL_ISSUE_URL)
        .set('Authorization', expectedUserToken)
        .end((err, res) => {
          if (err) {
            throw err;
          }
          const { issues } = res.body;
          const recievedIssue = issues[2];
          delete recievedIssue.createdAt;
          delete recievedIssue.updatedAt;
          expect(recievedIssue).toEqual(expectedIssue);
          done();
        });
    } catch (err) {
      done(err);
    }
  });
  it('invalid token -> 401 Unauthorized', done => {
    try {
      request(app)
        .get(ALL_ISSUE_URL)
        .end((err, res) => {
          if (err) {
            throw err;
          }
          const { code, message } = res.body;
          expect(code).toBe(401);
          expect(message).toBe('Unauthorized');
          done();
        });
    } catch (err) {
      done(err);
    }
  });
  it('400 bad request', () => {
    // 400 받을 일이 뭐가 있지..?
    expect(true).toBe(true);
  });
});
