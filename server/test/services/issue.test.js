const TIMEOUT = 10000;
const NONEXISTING_ID = 99999;

const { issueService } = require('@/services/index');
const { expectedIssue, issueIds } = require('@test/seeds/issue');

describe('retrieve', () => {
  test(
    'all issues',
    async () => {
      // when
      const issues = await issueService.retrieveAll(); // issue_id,issue_title,is_open,user_id ~> author로 바꿔야함

      //then
      expect(issues.length).toBeGreaterThanOrEqual(issueIds.size); // test에서 생성하는 부분 때문에 증가됨
    },
    TIMEOUT
  );

  test(
    'an issue by id',
    async () => {
      //given
      const initialIssue = Object.assign({}, expectedIssue);
      delete initialIssue.user_id;
      delete initialIssue.milestone_id;
      const user = { nickname: 'user11' };
      const expectedMilestone = {
        id: 1,
        title: 'sprint 2',
      };

      // when
      const issue = await issueService.retrieveById(expectedIssue.id);

      // then
      expect(issue).not.toBeUndefined();

      Object.keys(initialIssue).forEach(key =>
        expect(initialIssue[key]).toBe(issue[key])
      );
      expect(issue.Milestone.dataValues).toStrictEqual(expectedMilestone);
      expect(issue.User.dataValues).toStrictEqual(user);
    },
    TIMEOUT
  );

  test('nonexisting issue by id', async () => {
    // when
    const issue = await issueService.retrieveById(NONEXISTING_ID);

    // then
    expect(issue).toBeNull();
  });
});

describe('create issue', () => {
  test('successfully', async () => {
    // given
    const data = {
      title: '이슈 생성하기',
      userID: 1,
      milestone: ['1'],
    };

    // when
    const issueID = await issueService.createIssue(
      data.title,
      data.userID,
      data.milestone
    );

    // then
    expect(typeof issueID).toBe('number');
    expect(issueID).toBeGreaterThanOrEqual(issueIds.size);
  });
});

describe('update', () => {
  test('update title', async () => {
    const data = {
      id: 2,
      title: '수정 테스트',
    };
    const updateResult = await issueService.updateIssue(data);
    expect(updateResult).toBe(true);
  });
});
