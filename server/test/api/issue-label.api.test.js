/* eslint-disable jest/no-done-callback */
const request = require('supertest');
const app = require('@/app');
const { expectedUserToken } = require('@test/seeds/user');
const { expectedLabels } = require('@test/seeds/label');
const { status } = require('@test/api/response-status');
const { issueLabelService } = require('@/services/index');

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
          expect(code).toBe(status.code.SUCCESS);
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
          expect(code).toBe(status.code.UNAUTHORIZED);
          expect(message).toBe(status.message.UNAUTHORIZED);
          done();
        });
    } catch (err) {
      done(err);
    }
  });
  it('not found', done => {
    // given
    const INVALID_ISSUE_ID_URL = '/issues/99999/labels';
    const labels = [1, 2];
    try {
      request(app)
        .put(INVALID_ISSUE_ID_URL) // when
        .set('Authorization', expectedUserToken)
        .send({ labels })
        .end((err, res) => {
          if (err) {
            throw err;
          }
          const { code, message } = res.body;

          //then
          expect(code).toBe(status.code.NOT_FOUND);
          expect(message).toStrictEqual(status.message.NOT_FOUND);
          done();
        });
    } catch (err) {
      done(err);
    }
  });
  it('bad request', done => {
    // given
    const INVALID_ISSUE_ID_URL = '/issues/abc/labels';
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
          expect(code).toBe(status.code.BAD_REQUEST);
          expect(message).toStrictEqual(status.message.BAD_REQUEST);
          done();
        });
    } catch (err) {
      done(err);
    }
  });
});
