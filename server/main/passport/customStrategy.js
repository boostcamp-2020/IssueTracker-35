const customStrategy = require('passport-custom').Strategy;
const axios = require('axios');
const { User } = require('@/models');

const getAccessToken = async code => {
  const TOKEN_URL = 'https://github.com/login/oauth/access_token';
  const ERROR_WRONG_CODE = '잘못된 인증 코드 입니다.';

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
    } = await axios.post(TOKEN_URL, data, config);

    if (!access_token) throw Error(ERROR_WRONG_CODE);

    return access_token;
  } catch (err) {
    throw Error(err);
  }
};

const getUserData = async accessToken => {
  const USER_DATA_URL = 'https://api.github.com/user';

  const config = {
    headers: {
      Authorization: `token ${accessToken}`,
      accept: 'application/json',
    },
  };

  try {
    const { data } = await axios.get(USER_DATA_URL, config);
    const { login, avatar_url } = data;

    return [login, avatar_url];
  } catch (err) {
    throw Error(err);
  }
};

const getGithubUserFromCode = async (req, done) => {
  const { code } = req.body;

  try {
    const accessToken = await getAccessToken(code);
    const [nickname, avatar_url] = await getUserData(accessToken);

    let user = await User.findOne({ where: { nickname } });

    if (!user) {
      user = await User.create({
        nickname,
        password: null,
        image: avatar_url,
      });
    }

    done(null, user);
  } catch (err) {
    done(err);
  }
};

module.exports = passport => {
  passport.use('custom-github', new customStrategy(getGithubUserFromCode));
};
