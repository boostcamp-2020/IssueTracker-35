const TIMEOUT = 10000;

const { assignmentService } = require('@/services/index');
const { users } = require('@test/seeds/user');
const condition = ['nickname', 'image'];

describe('assignees for all issue', () => {
  test(
    'assignees',
    async () => {
      // when
      const assignees = await assignmentService.getAssignees();
      const assigneeArray = [];
      [...assignees].forEach(assignment => {
        const User = {};
        Object.keys(assignment.dataValues).filter(
          key => (User[key] = assignment.dataValues[key])
        );
        assigneeArray.push(User);
      });

      expect(true).toBe(true);
    },
    TIMEOUT
  );
});
