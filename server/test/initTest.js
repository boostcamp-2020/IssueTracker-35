require('module-alias/register');
const { initTables, clearTables } = require('@test/seeds');
require('dotenv').config();

module.exports = async () => {
  await clearTables();
  await initTables();
};
