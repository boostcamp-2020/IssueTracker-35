/* eslint-disable jest/no-done-callback */
const request = require('supertest');
const app = require('@/app');
const { expectedUserToken } = require('@test/seeds/user');
const { expectedLabels } = require('@test/seeds/label');
const { DEFAULT_PROFILE_IMAGE_URL } = require('@/utils/auth');
const { issueIds } = require('@test/seeds/issue');

const unAuthorizedCode = 401;
const unAuthorizedMsg = 'Unauthorized';

describe('retrieve all issues', () => {
  const ALL_ISSUE_URL = '/issues';

  it('successfully', done => {
    //given
    const expectedIssue = {
      id: 3,
      title: '세 번째 이슈입니다.',
      isOpen: true,
      author: { nickname: 'user11' },
      milestone: [],
      assignees: [{ nickname: 'user33', image: DEFAULT_PROFILE_IMAGE_URL }],
      labels: [
        {
          id: expectedLabels[1].id,
          title: expectedLabels[1].title,
          color: expectedLabels[1].color,
        },
      ],
      commentCount: 2,
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
          const recievedIssue = issues.find(
            issue => issue.id === expectedIssue.id
          );
          delete recievedIssue.createdAt;
          delete recievedIssue.updatedAt;

          //then
          expect(true).toBe(true);
          expect(recievedIssue).toEqual(expectedIssue);
          expect(issues.length).toBeGreaterThanOrEqual(issueIds.size); // issue create test에서 하나 증가했음 (나중에 delete test도 되면, size 그대로 설정)
          done();
        });
    } catch (err) {
      done(err);
    }
  });
  it('with invalid token -> 401 Unauthorized', done => {
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
});

describe('retrieve issue details', () => {
  const ISSUE_DETAIL_URL = '/issues/2';

  it('successfully', done => {
    //given
    const expectedIssue = {
      id: 2,
      title: '두 번째 이슈입니다.',
      isOpen: true,
      author: 'user11',
      milestone: { id: 1, title: 'sprint 2' },
      labels: [
        {
          id: expectedLabels[0].id,
          title: expectedLabels[0].title,
          color: expectedLabels[0].color,
        },
      ],
      assignees: [
        {
          id: 2,
          nickname: 'user22',
          image: DEFAULT_PROFILE_IMAGE_URL,
        },
      ],
      comments: [
        {
          id: 2,
          content: '두 번째 이슈 내용~!!',
          owner: { id: 1, nickname: 'user11', image: 'hi' },
        },
        {
          id: 4,
          content: '두 번째 이슈에 대한 댓글!!!!#!',
          owner: {
            id: 2,
            nickname: 'user22',
            image:
              'https://user-images.githubusercontent.com/49153756/98246728-0696ff00-1fb6-11eb-8303-162a5bc3581b.png',
          },
        },
      ],
    };
    try {
      //when
      request(app)
        .get(ISSUE_DETAIL_URL) // when
        .set('Authorization', expectedUserToken)
        .end((err, res) => {
          if (err) {
            throw err;
          }
          const { issue } = res.body;
          delete issue.createdAt;
          delete issue.comments.createdAt;
          issue.comments.forEach(comment => {
            delete comment.createdAt;
          });

          //then
          expect(issue).toStrictEqual(expectedIssue);
          done();
        });
    } catch (err) {
      done(err);
    }
  });
  it('with invalid token -> 401 Unauthorized', done => {
    try {
      request(app)
        .get(ISSUE_DETAIL_URL)
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
