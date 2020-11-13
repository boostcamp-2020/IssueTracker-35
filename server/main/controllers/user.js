const { responseHandler } = require('@/utils/handler');
const { createJWT } = require('@/utils/auth');
const { userService } = require('@/services/index');

class UserController {
  async getGithubLoginUrl(req, res, next) {
    try {
      const clientID = process.env.CLIENT_ID;
      const url = `https://github.com/login/oauth/authorize?client_id=${clientID}`;

      responseHandler(res, 200, { url });
    } catch (err) {
      next(err);
    }
  }

  async generateToken(req, res, next) {
    try {
      const { user } = req;
      const token = createJWT(user);

      const { id, nickname, image } = user;
      responseHandler(res, 200, { token, id, nickname, image });
    } catch (err) {
      next(err);
    }
  }
  async getAllUsers(req, res, next) {
    try {
      const users = await userService.retrieveAllUsers();
      responseHandler(res, 200, { users });
    } catch (err) {
      next(err);
    }
  }
  async getOwnInfo(req, res, next) {
    try {
      const { user } = req;
      responseHandler(res, 200, user);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new UserController();
