const { responseHandler, errorHandler } = require('@/utils/handler');
const { createJWT, decodeJWT, isValidToken } = require('@/utils/auth');
const userService = require('@/services/user');

class UserController {
  async getGithubLoginUrl(req, res, next) {
    const clientID = process.env.CLIENT_ID;
    const url = `https://github.com/login/oauth/authorize?client_id=${clientID}`;

    responseHandler(res, 200, { url });
  }

  async generateToken(req, res, next) {
    const { user } = req;
    const token = createJWT(user);

    const { id, nickname, image } = user;
    responseHandler(res, 200, { token, id, nickname, image });
  }
}

module.exports = new UserController();
