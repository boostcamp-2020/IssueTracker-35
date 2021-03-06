const TIMEOUT = 10000;

const { userService } = require('@/services/index');
const { users, newUser } = require('@test/seeds/user');
const { DEFAULT_PROFILE_IMAGE_URL } = require('@/utils/auth');

describe('retrieve', () => {
  test(
    'all users',
    async () => {
      //given
      //when
      const results = await userService.retrieveAllUsers();
      //then
      expect(users.length).toBe(results.length);
    },
    TIMEOUT
  );
  test(
    'a user by id',
    async () => {
      //given
      const expectedUser = users[0];

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
      //given
      const expectedUser = users[0];

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
      const user = await userService.createUser({ nickname, password });

      // then
      expect(user.id).toBeTruthy();
      expect(user.nickname).toBe(nickname);
      expect(user.image).toBe(DEFAULT_PROFILE_IMAGE_URL);
    },
    TIMEOUT
  );
});
