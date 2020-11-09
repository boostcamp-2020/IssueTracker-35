const { initUsers, finiUsers } = require('@test/seeds/user');
const { initIssues, finiIssues } = require('@test/seeds/issue');
const { initComments, finiComments } = require('@test/seeds/comment');
const { initAssignment, finiAssignment } = require('@test/seeds/assignment');
const { initMilestones, finiMilestones } = require('@test/seeds/milestone');
const { initLabels, finiLabels } = require('@test/seeds/label');
const { initIssueLabels, finiIssueLabels } = require('@test/seeds/issue-label');

exports.clearTables = async () => {
  await finiIssueLabels();
  await finiLabels();
  await finiAssignment();
  await finiComments();
  await finiIssues();
  await finiUsers();
  await finiMilestones();
};

exports.initTables = async () => {
  await initUsers();
  await initMilestones();
  await initIssues();
  await initComments();
  await initAssignment();
  await initLabels();
  await initIssueLabels();
};
