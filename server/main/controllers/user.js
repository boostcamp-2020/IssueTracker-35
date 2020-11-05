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

  async getOwnInfo(req, res, next) {
    // test를 돌리기 전에 controller에서 passport를 검증하는 미들웨어를 지워야함
    const tokenString = req.headers.authorization;

    if (!isValidToken(tokenString)) {
      errorHandler(res, 401, 'Unauthorized');
    }
    try {
      const token = tokenString.split('Bearer ')[1];
      const { id } = decodeJWT(token);
      const user = await userService.retrieveById(id);

      responseHandler(res, 200, { id: user.id, nickname: user.nickname, image: user.image });
    } catch (err) {
      // console.log(err);
      errorHandler(res, 401, 'Unauthorized');
    }
  }
}

module.exports = new UserController();
