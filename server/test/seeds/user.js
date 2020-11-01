require('module-alias/register');
const { User } = require('@/server/models');

const expectedUser = {
  id: 4,
  nickname: 'user123',
  password: 'useruser',
};

const initUsers = () => {
  const users = [
    {
      id: 1,
      nickname: 'user11',
      password: 'useruser',
    },
    {
      id: 2,
      nickname: 'user22',
      password: 'useruser',
    },
    {
      id: 3,
      nickname: 'user33',
      password: 'useruser',
    },
  ];

  User.destory({ where: {} });
  User.bulkCreate(users);
};

module.exports = { initUsers, expectedUser };
