const { responseHandler } = require('../utils/handler');
const axios = require('axios');

class UserController {
  async getGithubLoginUrl(req, res, next) {
    const clientID = process.env.CLIENT_ID;
    const url = `https://github.com/login/oauth/authorize?client_id=${clientID}`;

    responseHandler(res, 200, { url });
  }

  async githubLogin(req, res, next) {
    const { code } = req.body;

    const getAccessToken = async code => {
      const tokenUrl = 'https://github.com/login/oauth/access_token';

      const data = {
        code,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
      };

      const config = {
        headers: { accept: 'application/json' },
      };

      try {
        const {
          data: { access_token },
        } = await axios.post(tokenUrl, data, config);
        
        if (!access_token) throw Error();

        return access_token;
      } catch (err) {
        throw Error(err);
      }
    };

    const getUserData = async accessToken => {
      const userDataUrl = 'https://api.github.com/user';

      const config = {
        headers: {
          Authorization: `token ${accessToken}`,
          accept: 'application/json',
        },
      };

      try {
        const { data } = await axios.get(userDataUrl, config);

        return data.login;
      } catch (err) {
        throw Error(err);
      }
    };

    try {
      const accessToken = await getAccessToken(code);
      const nickname = await getUserData(accessToken);

      responseHandler(res, 200, { nickname });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new UserController();
