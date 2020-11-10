/* eslint-disable jest/no-done-callback */
const request = require('supertest');
const app = require('@/app');
const { expectedUserToken } = require('@test/seeds/user');
const { expectedLabels } = require('@test/seeds/label');
const { DEFAULT_PROFILE_IMAGE_URL } = require('@/utils/auth');
const { issueIds } = require('@test/seeds/issue');

const successCode = 200;
const badRequestCode = 400;
const badRequestMsg = 'Bad Request';
const unAuthorizedCode = 401;
const unAuthorizedMsg = 'Unauthorized';

describe('retrieve all issues', () => {
  const ALL_ISSUE_URL = '/issues';

  it('success retrieve all issues', done => {
    //given
    const expectedIssue = {
      id: 3,
      title: '세 번째 이슈입니다.',
      isOpen: true,
      author: { nickname: 'user11' },
      milestone: [],
      assignees: { nickname: 'user22', image: DEFAULT_PROFILE_IMAGE_URL },
      labels: {
        title: expectedLabels[0].title,
        color: expectedLabels[0].color,
      },
      commentCount: 1,
    };
    try {
      //when
      request(app)
        .get(ALL_ISSUE_URL)
        .set('Authorization', expectedUserToken)
        .end((err, res) => {
          if (err) {
            throw err;
          }
          const { issues } = res.body;
          const recievedIssue = issues[2];
          delete recievedIssue.createdAt;
          delete recievedIssue.updatedAt;

          //then
          expect(recievedIssue).toEqual(expectedIssue);
          expect(issues.length).toBeGreaterThanOrEqual(issueIds.size); // issue create test에서 하나 증가했음 (나중에 delete test도 되면, size 그대로 설정)
          done();
        });
    } catch (err) {
      done(err);
    }
  });
  it('invalid token -> 401 Unauthorized', done => {
    try {
      request(app)
        .get(ALL_ISSUE_URL)
        .end((err, res) => {
          if (err) {
            throw err;
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
  it('400 bad request', () => {
    // query parameter가 잘못 날라온 경우 (필터링을 back에서 할지 front에서 할지 아직 모름)
    expect(true).toBe(true);
  });
});

describe('create issue', () => {
  const CREATE_ISSUE_URL = '/issues';

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
  it('invalid data - wrong type title', done => {
    // given
    const data = {
      title: 1,
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
          const { code, message } = res.body;
          expect(code).toBe(badRequestCode);
          expect(message).toBe(badRequestMsg);
          done();
        });
    } catch (err) {
      done(err);
    }
  });
  it('invalid data - wrong type content', done => {
    // given
    const data = {
      title: 'api로 이슈 생성하기',
      content: 1,
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
          const { code, message } = res.body;
          expect(code).toBe(badRequestCode);
          expect(message).toBe(badRequestMsg);
          done();
        });
    } catch (err) {
      done(err);
    }
  });
  it('invalid data - without assignees', done => {
    // given
    const data = {
      title: 'api로 이슈 생성하기',
      content: 'api 이슈 생성 내용입니당~',
      milestone: ['1'],
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
          const { code, message } = res.body;
          expect(code).toBe(badRequestCode);
          expect(message).toBe(badRequestMsg);
          done();
        });
    } catch (err) {
      done(err);
    }
  });
  it('invalid data - wrong type assignees', done => {
    // given
    const data = {
      title: 'api로 이슈 생성하기',
      content: 'api 이슈 생성 내용입니당~',
      milestone: ['1'],
      assignees: [true, 2],
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
          const { code, message } = res.body;
          expect(code).toBe(badRequestCode);
          expect(message).toBe(badRequestMsg);
          done();
        });
    } catch (err) {
      done(err);
    }
  });
  it('invalid data - without labels', done => {
    // given
    const data = {
      title: 'api로 이슈 생성하기',
      content: 'api 이슈 생성 내용입니당~',
      milestone: ['1'],
      assignees: ['2', '3'],
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
          const { code, message } = res.body;
          expect(code).toBe(badRequestCode);
          expect(message).toBe(badRequestMsg);
          done();
        });
    } catch (err) {
      done(err);
    }
  });
  it('invalid data - wrong type labels', done => {
    // given
    const data = {
      title: 'api로 이슈 생성하기',
      content: 'api 이슈 생성 내용입니당~',
      milestone: ['1'],
      assignees: ['2', '3'],
      labels: [true, 2],
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
          const { code, message } = res.body;
          expect(code).toBe(badRequestCode);
          expect(message).toBe(badRequestMsg);
          done();
        });
    } catch (err) {
      done(err);
    }
  });
  it('invalid data - without milestone', done => {
    // given
    const data = {
      title: 'api로 이슈 생성하기',
      content: 'api 이슈 생성 내용입니당~',
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
          const { code, message } = res.body;
          expect(code).toBe(badRequestCode);
          expect(message).toBe(badRequestMsg);
          done();
        });
    } catch (err) {
      done(err);
    }
  });
  it('invalid data - wrong type milestone', done => {
    // given
    const data = {
      title: 'api로 이슈 생성하기',
      content: 'api 이슈 생성 내용입니당~',
      milestone: [1],
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
          const { code, message } = res.body;
          expect(code).toBe(badRequestCode);
          expect(message).toBe(badRequestMsg);
          done();
        });
    } catch (err) {
      done(err);
    }
  });
});
