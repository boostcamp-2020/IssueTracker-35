/* eslint-disable jest/no-done-callback */
const request = require('supertest');
const app = require('@/app');
const { expectedUserToken } = require('@test/seeds/user');
const { expectedLabels } = require('@test/seeds/label');
const { issueLabelService } = require('@/services/index');

const SUCCESS_CODE = 200;
const UNAUTHORIZED_CODE = 401;
const BAD_REQUEST_CODE = 400;
const UNAUTHORIZED_MESSAGE = 'Unauthorized';
const BAD_REQEUST_MESSAGE = 'Bad Request';

describe('modify issue-labels', () => {
  const ISSUE_LABEL_API = '/issues/1/labels';

  it('modify success', done => {
    // given
    const labels = [1, 2];
    try {
      request(app)
        .put(ISSUE_LABEL_API) // when
        .set('Authorization', expectedUserToken)
        .send({ labels })
        .end(async (err, res) => {
          if (err) {
            throw err;
          }
          const { code, success } = res.body;

          //then
          expect(code).toBe(SUCCESS_CODE);
          expect(success).toBeTruthy();

          const labels = await issueLabelService.getLabelsByIssueId(1);

          const targetLabels = expectedLabels.map(label => {
            const copy = Object.assign({}, label);
            delete copy.content;
            return copy;
          });
          const recievedLabels = labels.map(issueLabel => {
            const copy = Object.assign({}, issueLabel.Label.dataValues);
            return copy;
          });
          expect(recievedLabels).toStrictEqual(targetLabels);
          issueLabelService.removeAllByIssueID(1);
          done();
        });
    } catch (err) {
      done(err);
    }
  });
  it('unAuthorized', done => {
    // given
    try {
      request(app)
        .put(ISSUE_LABEL_API) // when
        .end((err, res) => {
          if (err) {
            throw err;
          }
          const { code, message } = res.body;

          //then
          expect(code).toBe(UNAUTHORIZED_CODE);
          expect(message).toBe(UNAUTHORIZED_MESSAGE);
          done();
        });
    } catch (err) {
      done(err);
    }
  });
  it('bad request', done => {
    // given
    const INVALID_ISSUE_ID_URL = '/issues/99999/labels';
    const labels = [1, 2];
    try {
      request(app)
        .put(INVALID_ISSUE_ID_URL) // when
        .set('Authorization', expectedUserToken)
        .send(labels)
        .end((err, res) => {
          if (err) {
            throw err;
          }
          const { code, message } = res.body;

          //then
          expect(code).toBe(BAD_REQUEST_CODE);
          expect(message).toStrictEqual(BAD_REQEUST_MESSAGE);
          done();
        });
    } catch (err) {
      done(err);
    }
  });
});
