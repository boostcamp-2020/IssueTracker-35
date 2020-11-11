const TIMEOUT = 10000;

const { assignmentService } = require('@/services/index');
const { users } = require('@test/seeds/user');

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
    const assignees = ['2'];

    //when
    const result = await assignmentService.create(issueID, assignees);

    //then
    expect(result).toBeTruthy();
  });
});
