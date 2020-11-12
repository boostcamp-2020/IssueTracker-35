/* eslint-disable jest/no-done-callback */
const request = require('supertest');
const app = require('@/app');
const { expectedUserToken } = require('@test/seeds/user');

const successCode = 200;
const badRequestCode = 400;
const badRequestMsg = 'Bad Request';
const unAuthorizedCode = 401;
const unAuthorizedMsg = 'Unauthorized';

describe('create issue', () => {
  const CREATE_ISSUE_URL = '/issues';
  const issueCreateBadRequest = (data, testName) => {
    // eslint-disable-next-line jest/valid-title
    return it(testName, done => {
      // given : data
      try {
        request(app)
          .post(CREATE_ISSUE_URL) //when
          .set('Authorization', expectedUserToken)
          .send(data)
          .end((err, res) => {
            if (err) {
              throw Error(err);
            }
            const { code, message } = res.body;
            expect(code).toBe(badRequestCode);
            expect(message).toBe(badRequestMsg);
            done();
          });
      } catch (err) {
        done(err);
      }
    });
  };
  it('valid datas', done => {
    // given
    const data = {
      title: 'api로 이슈 생성하기',
      content: 'api 이슈 생성 내용입니당~',
      milestone: ['1'],
      assignees: ['2', '3'],
      labels: ['1', '2'],
    };

    try {
      request(app)
        .post(CREATE_ISSUE_URL) //when
        .set('Authorization', expectedUserToken)
        .send(data)
        .end((err, res) => {
          if (err) {
            throw Error(err);
          }
          //then
          const { id, success, code } = res.body;
          expect(code).toBe(successCode);
          expect(typeof id).toBe('number');
          expect(success).toBeTruthy();
          done();
        });
    } catch (err) {
      done(err);
    }
  });
  it('Unauthorized', done => {
    // given
    const data = {
      title: 'api로 이슈 생성하기',
      content: 'api 이슈 생성 내용입니당~',
      milestone: ['1'],
      assignees: ['2', '3'],
      labels: ['1', '2'],
    };
    try {
      request(app)
        .post(CREATE_ISSUE_URL) //when
        .send(data)
        .end((err, res) => {
          if (err) {
            throw Error(err);
          }
          const { code, message } = res.body;
          expect(code).toBe(unAuthorizedCode);
          expect(message).toBe(unAuthorizedMsg);
          done();
        });
    } catch (err) {
      done(err);
    }
  });
  issueCreateBadRequest(
    {
      title: {},
      content: 'api 이슈 생성 내용입니당~',
      milestone: ['1'],
      assignees: ['2', '3'],
      labels: ['1', '2'],
    },
    'invalid data - wrong type title'
  );
  issueCreateBadRequest(
    {
      title: 'api로 이슈 생성하기',
      content: {},
      milestone: ['1'],
      assignees: ['2', '3'],
      labels: ['1', '2'],
    },
    'invalid data - wrong type content'
  );
  issueCreateBadRequest(
    {
      // given
      title: 'api로 이슈 생성하기',
      content: 'api 이슈 생성 내용입니당~',
      milestone: ['1'],
      labels: ['1', '2'],
    },
    'invalid data - without assignees'
  );
  issueCreateBadRequest(
    {
      title: 'api로 이슈 생성하기, transaction이 된다면 이건 안보여야 합니다',
      content: 'api 이슈 생성 내용입니당~ 보자보자 너는 담에보자',
      milestone: ['1'],
      assignees: ['hi', 2],
      labels: ['1', '2'],
    },
    'invalid data - wrong type assignees'
  );
  issueCreateBadRequest(
    {
      title: 'api로 이슈 생성하기',
      content: 'api 이슈 생성 내용입니당~',
      milestone: ['1'],
      assignees: ['2', '3'],
    },
    'invalid data - without labels'
  );
  issueCreateBadRequest(
    {
      title: 'api로 이슈 생성하기',
      content: 'api 이슈 생성 내용입니당~',
      milestone: ['1'],
      assignees: ['2', '3'],
      labels: ['invalid value', 2],
    },
    'invalid data - wrong type labels'
  );
  issueCreateBadRequest(
    {
      title: 'api로 이슈 생성하기',
      content: 'api 이슈 생성 내용입니당~',
      assignees: ['2', '3'],
      labels: ['1', '2'],
    },
    'invalid data - without milestone'
  );
  issueCreateBadRequest(
    {
      title: 'api로 이슈 생성하기',
      content: 'api 이슈 생성 내용입니당~',
      milestone: ['haha'],
      assignees: ['2', '3'],
      labels: ['1', '2'],
    },
    'invalid data - wrong type milestone'
  );
});
