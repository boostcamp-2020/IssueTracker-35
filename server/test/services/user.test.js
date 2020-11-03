const TIMEOUT = 10000;

const userService = require('@/services/user');
const { expectedUser } = require('@test/seeds/user');

describe('retrieve', () => {
  test(
    'an user by id',
    async () => {
      // when
      const user = await userService.retrieveById(expectedUser.id);

      // then
      expect(user).toBeTruthy();
    },
    TIMEOUT
  );

  test(
    'an user by nickname',
    async () => {
      // when
      const user = await userService.retrieveByNickname(expectedUser.nickname);

      // then
      expect(user).toBeTruthy();
    },
    TIMEOUT
  );
});
