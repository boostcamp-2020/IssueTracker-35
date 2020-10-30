const sequelize = require('../models').sequelize;
const sequelizeLoader = () => {
  sequelize.sync();
};
module.exports = sequelizeLoader;
