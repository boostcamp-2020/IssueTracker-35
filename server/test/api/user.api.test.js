/* eslint-disable jest/no-done-callback */
const request = require('supertest');
const app = require('@/app');
const { users, expectedUserToken } = require('@test/seeds/user');
const { status } = require('@test/api/response-status');

describe('login API test', () => {
  const GITHUB_LOGIN_URL = '/users/login/github';

  it('retrieve github login url', done => {
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
  it('valid token', done => {
    //given
    const expectedUser = users[0];
    try {
      request(app)
        .get(VERIFY_Identity_URL)
        .set('Authorization', validToken)
        .end((err, res) => {
          if (err) {
            throw err;
          }
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

  it('invalid token', done => {
    try {
      request(app)
        .get(VERIFY_Identity_URL)
        .set('Authorization', invalidToken)
        .end((err, res) => {
          if (err) {
            throw err;
          }
          const { code, message } = res.body;
          expect(code).toBe(status.code.UNAUTHORIZED);
          expect(message).toBe(status.message.UNAUTHORIZED);
          done();
        });
    } catch (err) {
      done(err);
    }
  });
});

describe('retrieve All users API', () => {
  const GET_ALL_USERS_URL = '/users';
  it('Authenticated', done => {
    // given
    const expectedUsers = users.map(user => {
      const copy = { ...user };
      delete copy.password;
      return copy;
    });
    try {
      request(app)
        .get(GET_ALL_USERS_URL) // when
        .set('Authorization', expectedUserToken)
        .end((err, res) => {
          if (err) {
            throw err;
          }
          const { code, success } = res.body;

          //then
          expect(code).toBe(status.code.SUCCESS);
          expect(success).toBeTruthy();

          res.body.users.forEach(user => {
            const userID = user.id;
            const expectedUser = expectedUsers.find(
              target => target.id === userID
            );
            expect(user).toStrictEqual(expectedUser);
          });

          done();
        });
    } catch (err) {
      done(err);
    }
  });
  it('unAuthenticated', done => {
    try {
      request(app)
        .get(GET_ALL_USERS_URL)
        .end((err, res) => {
          if (err) {
            throw err;
          }
          const { code, message } = res.body;
          expect(code).toBe(status.code.UNAUTHORIZED);
          expect(message).toBe(status.message.UNAUTHORIZED);
          done();
        });
    } catch (err) {
      done(err);
    }
  });
});
