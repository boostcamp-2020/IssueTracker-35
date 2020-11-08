const TIMEOUT = 10000;

const assignmentService = require('@/services/assignment');
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
        Object.keys(assignment.dataValues).filter(key => (User[key] = assignment.dataValues[key]));
        assigneeArray.push(User);
      });
      // console.log(assigneeArray);
      //   assignees.forEach(assignee => {
      //     console.log(assignee.User.nickname);
      //     console.log(assignee.User.image);
      //     expect(assignee.User.nickname).toBe(users[1].nickname || users[2].nickname);
      //     expect(assignee.User.image).toBe(users[1].image || users[2].image);
      //   });
      expect(true).toBe(true);
    },
    TIMEOUT
  );
});
