require('module-alias/register');
const { finiUsers } = require('@test/seeds/user');
const { finiIssues } = require('@test/seeds/issue');

module.exports = async () => {
  await finiIssues();
  await finiUsers();
};
