const { initUsers, finiUsers } = require('@test/seeds/user');
const { initIssues, finiIssues } = require('@test/seeds/issue');

exports.clearTables = async () => {
  await finiIssues();
  await finiUsers();
};

exports.initTables = async () => {
  await initUsers();
  await initIssues();
};
