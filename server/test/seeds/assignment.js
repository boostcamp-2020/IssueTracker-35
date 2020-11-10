const { Assignment } = require('@/models');

const assignments = [
  {
    id: 1,
    assignee: 2,
    issue_id: 2,
  },
  {
    id: 2,
    assignee: 3,
    issue_id: 3,
  },
];

const expectedAssignment = assignments[0];

const initAssignment = async () => {
  await Assignment.bulkCreate(assignments);
};

const finiAssignment = async () => {
  await Assignment.destroy({ where: {} });
};

module.exports = { initAssignment, finiAssignment, expectedAssignment };
