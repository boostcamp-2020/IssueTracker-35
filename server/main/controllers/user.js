const { responseHandler } = require('@/utils/handler');
const { createJWT } = require('@/utils/auth');
const { userService } = require('@/services/index');

class UserController {
  async getGithubLoginUrl(req, res) {
    const clientID = process.env.CLIENT_ID;
    const url = `https://github.com/login/oauth/authorize?client_id=${clientID}`;

    responseHandler(res, 200, { url });
  }

  async generateToken(req, res) {
    const { user } = req;
    const token = createJWT(user);

    const { id, nickname, image } = user;
    responseHandler(res, 200, { token, id, nickname, image });
  }
  async getAllUsers(req, res) {
    const users = await userService.retrieveAllUsers();
    const responseData = { users: Object.values(users) };
    responseHandler(res, 200, responseData);
  }
  async getOwnInfo(req, res) {
    const { user } = req;
    responseHandler(res, 200, user);
  }
}

module.exports = new UserController();
