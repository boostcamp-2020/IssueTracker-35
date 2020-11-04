require('module-alias/register');
const { initTables, clearTables } = require('@test/seeds');

module.exports = async () => {
  await clearTables();
  await initTables();
};
