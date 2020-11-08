const { User } = require('@/models');
const { createJWT } = require('@/utils/auth');
require('dotenv').config();

const users = [
  {
    id: 1,
    nickname: 'user11',
    password: 'useruser',
    image: 'hi',
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

const newUser = {
  id: 4,
  nickname: 'newUser',
  password: 'useruser',
};

const initUsers = async () => {
  await User.bulkCreate(users);
};

const finiUsers = async () => {
  await User.destroy({ where: {} });
};

const expectedUserToken = createJWT(users[0]);

module.exports = { initUsers, finiUsers, users, newUser, expectedUserToken };
