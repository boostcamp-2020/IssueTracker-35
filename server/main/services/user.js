const { User } = require('@/models');
const { hashingPw, DEFAULT_PROFILE_IMAGE_URL } = require('@/utils/auth');

class UserService {
  constructor(User) {
    this.User = User;
  }

  async retrieveById(id) {
    try {
      const user = await this.User.findOne({
        attributes: ['id', 'nickname', 'image'],
        where: { id },
      });

      return user;
    } catch (err) {
      throw Error(err);
    }
  }

  async retrieveByNickname(nickname) {
    try {
      const user = await this.User.findOne({
        attributes: ['id', 'nickname', 'image'],
        where: { nickname },
      });

      return user;
    } catch (err) {
      throw Error(err);
    }
  }

  async checkDuplicate(nickname) {
    try {
      const user = await this.retrieveByNickname(nickname);
      const isAvailableName = !user;

      return isAvailableName;
    } catch (err) {
      throw Error(err);
    }
  }

  async createUser({ nickname, password, image = DEFAULT_PROFILE_IMAGE_URL }) {
    if (password) password = await hashingPw(password);

    try {
      const user = await this.User.create({
        nickname,
        password,
        image,
      });

      return { id: user.id, nickname: user.nickname, image: user.image };
    } catch (err) {
      throw Error(err);
    }
  }
}

module.exports = new UserService(User);
