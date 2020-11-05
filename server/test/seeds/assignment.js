const { Assignment } = require('@/models');

const expectedAssignee = {
  id: 1,
  assignee: 2,
  issue_id: 2,
};

const initAssignment = async () => {
  const assignments = [
    {
      id: 1,
      assignee: 2,
      issue_id: 2,
    },
    {
      id: 2,
      assignee: 2,
      issue_id: 3,
    },
  ];
  await Assignment.bulkCreate(assignments);
};

const finiAssignment = async () => {
  await Assignment.destroy({ where: {} });
};

module.exports = { initAssignment, finiAssignment, expectedAssignee };
