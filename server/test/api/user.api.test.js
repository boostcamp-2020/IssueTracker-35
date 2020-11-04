const request = require('supertest');
const app = require('@/app');

describe('login API test', () => {
  const GITHUB_LOGIN_URL = '/users/login/github';

  it('get github login url', async done => {
    const gitHubUrlRegx = /github.com\/login\/oauth\/authorize\?client_id=/;
    const res = await request(app).get(GITHUB_LOGIN_URL);

    expect(res.body.url).toMatch(gitHubUrlRegx);
    done();
  });
});
