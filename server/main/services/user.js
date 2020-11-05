const { User } = require('@/models');
const { hashingPw } = require('@/utils/auth');

class UserService {
  constructor(User) {
    this.User = User;
  }

  async retrieveById(id) {
    try {
      const user = await this.User.findOne({ attributes: ['id', 'nickname', 'image'], where: { id } });

      return user;
    } catch (err) {
      throw Error(err);
    }
  }

  async checkDuplicate(nickname) {
    try {
      const user = await this.User.findOne({ where: { nickname } });
      const isAvailableName = !user;

      return isAvailableName;
    } catch (err) {
      throw Error(err);
    }
  }

  async createUser({ nickname, password, image = '' }) {
    password = await hashingPw(password);

    try {
      const { id } = await this.User.create({ nickname, password, image });

      return id;
    } catch (err) {
      throw Error(err);
    }
  }
}

module.exports = new UserService(User);
