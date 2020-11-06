const { initUsers, finiUsers } = require('@test/seeds/user');
const { initIssues, finiIssues } = require('@test/seeds/issue');
const { initComments, finiComments } = require('@test/seeds/comment');
const { initAssignment, finiAssignment } = require('@test/seeds/assignment');

exports.clearTables = async () => {
  await finiAssignment();
  await finiComments();
  await finiIssues();
  await finiUsers();
};

exports.initTables = async () => {
  await initUsers();
  await initIssues();
  await initComments();
  await initAssignment();
};
