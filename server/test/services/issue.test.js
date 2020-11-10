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

      const hasSameSize = issues.length === issueIds.size;
      expect(hasSameSize).toBe(true);
      const containsAll = issues.every(issue => issueIds.has(issue.id));
      expect(containsAll).toBe(true);
    },
    TIMEOUT
  );

  test(
    'an issue by id',
    async () => {
      // when
      const issue = await issueService.retrieveById(expectedIssue.id);

      // then
      expect(issue).not.toBeUndefined();
      Object.keys(expectedIssue).forEach(key =>
        expect(expectedIssue[key]).toBe(issue[key])
      );
    },
    TIMEOUT
  );

  test('nonexisting issue by id', async () => {
    // when
    const issue = await issueService.retrieveById(NONEXISTING_ID);

    // then
    expect(issue).toBeUndefined();
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
