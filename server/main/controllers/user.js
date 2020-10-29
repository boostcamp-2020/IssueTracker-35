const { responseHandler } = require('../utils/handler');

class UserController {

  async githubLogin(req, res, next) {
    const clientID = process.env.CLIENT_ID;
    const url = `https://github.com/login/oauth/authorize?client_id=${clientID}`;

    responseHandler(res, 200, { url });
  }
}

module.exports = new UserController();
