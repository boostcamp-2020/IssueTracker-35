const TIMEOUT = 10000;

const userService = require('@/services/user');
const { expectedUser, newUser, expectedUserToken } = require('@test/seeds/user');
const { decodeJWT } = require('@/utils/auth');

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

describe('logged in user info', () => {
  //현재 유저정보
  test('successfully', () => {
    //given
    const token = expectedUserToken;

    //when
    const userInfo = decodeJWT(token);

    //then
    expect(userInfo.id).toBe(expectedUser.id);
    expect(userInfo.nickname).toBe(expectedUser.nickname);
    expect(userInfo.image).toBe(expectedUser.image);
    async () => {
      // when
      const user = await userService.retrieveById(expectedUser.id);

      // then
      expect(user).toBeTruthy();
    },
      TIMEOUT;
  });
});
