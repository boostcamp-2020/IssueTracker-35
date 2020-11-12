/* eslint-disable jest/no-done-callback */
const request = require('supertest');
const app = require('@/app');
const { expectedUserToken } = require('@test/seeds/user');
const { assignmentService } = require('@/services/index');

const SUCCESS_CODE = 200;
const UNAUTHORIZED_CODE = 401;
const BAD_REQUEST_CODE = 400;
const UNAUTHORIZED_MESSAGE = 'Unauthorized';
const BAD_REQEUST_MESSAGE = 'Bad Request';

describe('modify assignment', () => {
  const ASSIGNMENT_API = '/issues/4/assignees';

  it('modify success', done => {
    // given
    const assignees = [1, 2, 3];
    try {
      request(app)
        .put(ASSIGNMENT_API) // when
        .set('Authorization', expectedUserToken)
        .send({ assignees })
        .end(async (err, res) => {
          if (err) {
            throw err;
          }
          const { code, success } = res.body;

          //then
          expect(code).toBe(SUCCESS_CODE);
          expect(success).toBeTruthy();

          const assignments = await assignmentService.getAssigneesByIssue(4);
          const assigneeIDs = assignments.map(assignment => {
            return assignment.User.dataValues.id;
          });

          expect(assigneeIDs).toStrictEqual(assignees);
          assignmentService.removeAllByIssueID(4);
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
        .put(ASSIGNMENT_API) // when
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
    const INVALID_ISSUE_ID_URL = '/issues/99999/assignees';
    const assignees = [1, 2, 3];
    try {
      request(app)
        .put(INVALID_ISSUE_ID_URL) // when
        .set('Authorization', expectedUserToken)
        .send({ assignees })
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
