const { User } = require('@/models');
const { createJWT } = require('@/utils/auth');
const { DEFAULT_PROFILE_IMAGE_URL } = require('@/utils/auth');
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
    image: DEFAULT_PROFILE_IMAGE_URL,
  },
  {
    id: 3,
    nickname: 'user33',
    password: 'useruser',
    image: DEFAULT_PROFILE_IMAGE_URL,
  },
];

const newUser = {
  id: 4,
  nickname: 'newUser',
  password: 'useruser',
  image: 'DEFAULT_PROFILE_IMAGE_URL',
};

const initUsers = async () => {
  await User.bulkCreate(users);
};

const finiUsers = async () => {
  await User.destroy({ where: {} });
};

const expectedUserToken = createJWT(users[0]);

module.exports = { initUsers, finiUsers, users, newUser, expectedUserToken };
