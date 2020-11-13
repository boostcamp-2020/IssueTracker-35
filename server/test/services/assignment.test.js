const TIMEOUT = 10000;

const { assignmentService } = require('@/services/index');
const { users } = require('@test/seeds/user');

describe('retrieve assignees', () => {
  test(
    'all issues',
    async () => {
      // given
      const expectedUser = users[2];

      // when
      const assignees = await assignmentService.getAssigneesByAllIssues();
      const resultAssignee = assignees[1].User.dataValues;

      // then
      expect(resultAssignee.nickname).toBe(expectedUser.nickname);
      expect(resultAssignee.image).toBe(expectedUser.image);
    },
    TIMEOUT
  );
  test('an issue with valid issueID', async () => {
    // given
    const issueID = 2;
    const assignmentID = 1;
    const expectedAssignee = Object.assign({}, users[1]);
    delete expectedAssignee.password;

    // when
    const assignments = await assignmentService.getAssigneesByIssue(issueID);

    // then
    const result = assignments[0].User.dataValues;
    expect(result).toStrictEqual(expectedAssignee);
    expect(assignments[0].id).toBe(assignmentID);
  });
  test('an issue with invalid issueID', async () => {
    //given
    const issueID = 99999;
    //when
    const assignments = await assignmentService.getAssigneesByIssue(issueID);
    //then
    expect(assignments.length).toBe(0);
  });
});

describe('create assignment', () => {
  test('valid datas', async () => {
    // given
    const issueID = 1;
    const assignees = ['2'];

    //when
    const result = await assignmentService.create(issueID, assignees);

    //then
    expect(result).toBeTruthy();
  });
});

describe('remove assignees by issue id', () => {
  test('valid issuseID', async () => {
    // given
    const issueID = 4;
    const assignee = [2];
    const createResult = await assignmentService.create(issueID, assignee);
    expect(createResult).toBeTruthy();

    //when
    const removedCount = await assignmentService.removeAllByIssueID(issueID);

    //then
    expect(removedCount).toBeGreaterThan(0);
  });

  test('invalid issueID', async () => {
    // given
    const issueID = 99999;

    //when
    const removedCount = await assignmentService.removeAllByIssueID(issueID);

    //then
    expect(removedCount).toBe(0);
  });
});
