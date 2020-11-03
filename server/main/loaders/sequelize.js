const sequelize = require('../models').sequelize;

const sequelizeLoader = () => {
  const useInit = process.env.INIT_DB === 'use';

  sequelize.sync({ force: useInit });
};
module.exports = sequelizeLoader;
