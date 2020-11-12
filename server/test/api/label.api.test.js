/* eslint-disable jest/no-done-callback */
const request = require('supertest');
const app = require('@/app');
const { expectedUserToken } = require('@test/seeds/user');
const { expectedLabels } = require('@test/seeds/label');
const { status } = require('@test/api/response-status');
const { labelService } = require('@/services/index');

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
          expect(code).toBe(status.code.SUCCESS);
          expect(success).toBeTruthy();
          expect(labels).toStrictEqual(expectedLabels);
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
        .get(RETRIEVE_ALL_LABEL_URL) // when
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
});

describe('create label API test', () => {
  const CREATE_LABEL_URL = '/labels';

  it('success to create label', done => {
    // given;
    const data = {
      title: 'API로 label 생성!!',
      content: '얼른 끝내고 다른거 하자',
      color: 'FE2E2E',
    };
    try {
      request(app)
        .post(CREATE_LABEL_URL) //when
        .set('Authorization', expectedUserToken)
        .send(data)
        .end((err, res) => {
          if (err) {
            throw Error(err);
          }
          //then
          const { id, success, code } = res.body;

          expect(code).toBe(status.code.SUCCESS);
          expect(id).toBeGreaterThanOrEqual(expectedLabels.length);
          expect(success).toBeTruthy();
          labelService.remove(id);
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
        .post(CREATE_LABEL_URL) // when
        .end((err, res) => {
          if (err) {
            throw Error(err);
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
  it('invalid title', done => {
    // given;
    const data = {
      title: null,
      content: 'title 없음, 등록 안돼야함',
      color: 'FE2E2E',
    };
    try {
      request(app)
        .post(CREATE_LABEL_URL) //when
        .set('Authorization', expectedUserToken)
        .send(data)
        .end((err, res) => {
          if (err) {
            throw Error(err);
          }
          const { code, message } = res.body;
          //then
          expect(code).toBe(status.code.BAD_REQUEST);
          expect(message).toBe(status.message.BAD_REQUEST);
          done();
        });
    } catch (err) {
      done(err);
    }
  });
  it('invalid color', done => {
    // given;
    const data = {
      title: 'color 없어요',
      content: '등록 안되는게 맞는겁니다',
      color: null,
    };
    try {
      request(app)
        .post(CREATE_LABEL_URL) //when
        .set('Authorization', expectedUserToken)
        .send(data)
        .end((err, res) => {
          if (err) {
            throw Error(err);
          }
          const { code, message } = res.body;
          //then
          expect(code).toBe(status.code.BAD_REQUEST);
          expect(message).toBe(status.message.BAD_REQUEST);
          done();
        });
    } catch (err) {
      done(err);
    }
  });
});
