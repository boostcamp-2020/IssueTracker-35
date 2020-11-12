/* eslint-disable jest/no-done-callback */
const request = require('supertest');
const app = require('@/app');
const { expectedUserToken } = require('@test/seeds/user');
const { status } = require('@test/api/response-status');
const { assignmentService } = require('@/services/index');

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
          expect(code).toBe(status.code.SUCCESS);
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
  it('Unauthorized', done => {
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
          expect(code).toBe(status.code.NOT_FOUND);
          expect(message).toStrictEqual(status.message.NOT_FOUND);
          done();
        });
    } catch (err) {
      done(err);
    }
  });
  it('invalid issueID', done => {
    // given
    const INVALID_ISSUE_ID_URL = '/issues/abc/assignees';
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
          expect(code).toBe(status.code.BAD_REQUEST);
          expect(message).toStrictEqual(status.message.BAD_REQUEST);
          done();
        });
    } catch (err) {
      done(err);
    }
  });
});
