const TIMEOUT = 10000;

const userService = require('@/services/user');
const { expectedUser, newUser } = require('@test/seeds/user');

describe('retrieve', () => {
  test(
    'a user by id',
    async () => {
      // when
      const user = await userService.retrieveById(expectedUser.id);

      // then
      expect(user).toBeTruthy();
    },
    TIMEOUT
  );

  test(
    'check username is duplicate - available',
    async () => {
      // when
      const user = await userService.checkDuplicate(newUser.nickname);

      // then
      expect(user).toBe(true);
    },
    TIMEOUT
  );

  test(
    'check username is duplicate - unavailable',
    async () => {
      // when
      const user = await userService.checkDuplicate(expectedUser.nickname);

      // then
      expect(user).toBe(false);
    },
    TIMEOUT
  );
});

describe('create user', () => {
  test(
    'successfully',
    async () => {
      // given
      const { nickname, password } = newUser;

      // when
      const userId = await userService.createUser({ nickname, password });

      // then
      expect(userId).toBeTruthy();
    },
    TIMEOUT
  );
});
