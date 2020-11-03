const { User } = require('@/models');

const expectedUser = {
  id: 1,
  nickname: 'user11',
  password: 'useruser',
};

const newUser = {
  id: 4,
  nickname: 'newUser',
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

  User.destroy({ where: {} });
  User.bulkCreate(users);
};

module.exports = { initUsers, expectedUser, newUser };
