/* eslint-disable jest/no-done-callback */
const request = require('supertest');
const app = require('@/app');
const { expectedUserToken } = require('@test/seeds/user');
const { expectedLabels } = require('@test/seeds/label');

const SUCCESS_CODE = 200;
const UNAUTHORIZED_CODE = 401;
const UNAUTHORIZED_MESSAGE = 'Unauthorized';

describe('retrieve all labels API test', () => {
  const RETRIEVE_ALL_LABEL_URL = '/labels';

  it('Authorized', done => {
    // given
    try {
      request(app)
        .get(RETRIEVE_ALL_LABEL_URL) // when
        .set('Authorization', expectedUserToken)
        .end((err, res) => {
          if (err) {
            throw err;
          }
          const { code, success, labels } = res.body;

          //then
          expect(code).toBe(SUCCESS_CODE);
          expect(success).toBeTruthy();
          expect(labels).toStrictEqual(expectedLabels);
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
        .get(RETRIEVE_ALL_LABEL_URL) // when
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
});
