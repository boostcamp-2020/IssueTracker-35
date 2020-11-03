require('module-alias/register');
const { initUsers } = require('@test/seeds/user');
const { initIssues } = require('@test/seeds/issue');

module.exports = async () => {
  await initUsers();
  await initIssues();
};
