const { responseHandler } = require('../utils/handler');

class UserController {
  async getGithubLoginUrl(req, res, next) {
    const clientID = process.env.CLIENT_ID;
    const url = `https://github.com/login/oauth/authorize?client_id=${clientID}`;

    responseHandler(res, 200, { url });
  }

  async githubLogin(req, res, next) {
    const { user } = req;

    responseHandler(res, 200, { user });
  }
}

module.exports = new UserController();
