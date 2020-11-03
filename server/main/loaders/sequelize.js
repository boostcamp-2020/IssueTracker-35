const sequelize = require('../models').sequelize;

const sequelizeLoader = () => {
  let useInit = false;

  if (process.env.INIT_DB === 'use') useInit = true;
  sequelize.sync({ force: useInit });
};
module.exports = sequelizeLoader;
