const { User } = require('@/models');

class UserService {
  constructor(User) {
    this.User = User;
  }

  async retrieveById(id) {
    try {
      const user = await this.User.findOne({ where: { id } });

      return user;
    } catch (err) {
      throw Error(err);
    }
  }

  async retrieveByNickname(nickname) {
    try {
      const user = await this.User.findOne({ where: { nickname } });

      return user;
    } catch (err) {
      throw Error(err);
    }
  }
}

module.exports = new UserService(User);
