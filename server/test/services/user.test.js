const TIMEOUT = 10000;

const userService = require('../main/services/user');
const { initUsers, expectedUser } = require('../seeds/user');

beforeAll(initUsers, TIMEOUT); // given for retrieve

describe('retrieve', () => {

  test(
    'an user by id',
    async () => {
      // when
      const user = await userService.retrieveById(expectedUser.id);

      // then
      expect(user).not.toBeUndefined();
    },
    TIMEOUT
  );

  test(
    'an user by nickname',
    async () => {
      // when
      const user = await userService.retrieveByNickname(expectedUser.nickname);

      // then
      expect(user).not.toBeUndefined();
    },
    TIMEOUT
  );
});

