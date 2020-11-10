const TIMEOUT = 10000;

const { assignmentService } = require('@/services/index');
const { users } = require('@test/seeds/user');
const { assignments } = require('@test/seeds/assignment');
describe('assignees for all issue', () => {
  test(
    'assignees',
    async () => {
      // given
      const expectedUser = users[2];

      // when
      const assignees = await assignmentService.getAssignees();
      const resultAssignee = assignees[1].User.dataValues;

      // then
      expect(resultAssignee.nickname).toBe(expectedUser.nickname);
      expect(resultAssignee.image).toBe(expectedUser.image);
    },
    TIMEOUT
  );
});

describe('create assignment', () => {
  test('valid datas', async () => {
    // given
    const issueID = 1;
    const assignee = 2;

    //when
    const assignmentID = await assignmentService.create(issueID, assignee);

    //then
    expect(typeof assignmentID).toBe('number');
    expect(assignmentID).toBeGreaterThanOrEqual(assignments.length);
  });
});
