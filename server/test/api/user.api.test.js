/* eslint-disable jest/no-done-callback */
const request = require('supertest');
const app = require('@/app');
const { users, expectedUserToken } = require('@test/seeds/user');

const expectedUser = users[0];

describe('login API test', () => {
  const GITHUB_LOGIN_URL = '/users/login/github';

  it('get github login url', done => {
    const gitHubUrlRegx = /github.com\/login\/oauth\/authorize\?client_id=/;
    try {
      request(app)
        .get(GITHUB_LOGIN_URL)
        .end((err, res) => {
          if (err) {
            throw err;
          }
          const { url } = res.body;
          expect(url).toMatch(gitHubUrlRegx);
          done();
        });
    } catch (err) {
      done(err);
    }
  });
});

describe('user/me API test', () => {
  const VERIFY_Identity_URL = '/users/me';
  // given
  const validToken = expectedUserToken; // user.test에서 한 것 처럼 auth에서 직접 받아와서 토큰을 생성할지, 전역으로 생성해둘지 고민
  const invalidToken = 'token 2';

  //when
  test('valid token', done => {
    try {
      request(app)
        .get(VERIFY_Identity_URL)
        .set('Authorization', validToken)
        .end((err, res) => {
          const { id, nickname, image } = res.body;
          //then
          expect(id).toBe(expectedUser.id);
          expect(nickname).toBe(expectedUser.nickname);
          expect(image).toBe(expectedUser.image);
          done();
        });
    } catch (err) {
      done(err);
    }
  });

  test('invalid token', done => {
    try {
      request(app)
        .get(VERIFY_Identity_URL)
        .set('Authorization', invalidToken)
        .end((err, res) => {
          const { code, message } = res.body;
          expect(code).toBe(401);
          expect(message).toBe('Unauthorized');
          done();
        });
    } catch (err) {
      done(err);
    }
  });
});
