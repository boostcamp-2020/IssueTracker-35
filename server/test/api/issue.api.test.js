/* eslint-disable jest/no-done-callback */
const request = require('supertest');
const app = require('@/app');
const { expectedUserToken } = require('@test/seeds/user');
const { expectedLabels } = require('@test/seeds/label');
const { DEFAULT_PROFILE_IMAGE_URL } = require('@/utils/auth');
const { issueIds } = require('@test/seeds/issue');

const expectedIssue = {
  id: 3,
  title: '세 번째 이슈입니다.',
  isOpen: true,
  author: { nickname: 'user11' },
  milestone: [],
  assignees: { nickname: 'user22', image: DEFAULT_PROFILE_IMAGE_URL },
  labels: { title: expectedLabels[0].title, color: expectedLabels[0].color },
  commentCount: 1,
};

describe('retrieve all issues', () => {
  const ALL_ISSUE_URL = '/issues';

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
          expect(issueIds.size).toBe(issues.length);
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
    // query parameter가 잘못 날라온 경우 (필터링을 back에서 할지 front에서 할지 아직 모름)
    expect(true).toBe(true);
  });
});
