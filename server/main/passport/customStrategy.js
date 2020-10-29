const customStrategy = require('passport-custom').Strategy;
const axios = require('axios');
const { User } = require('../models');

const getAccessToken = async code => {
  const tokenUrl = 'https://github.com/login/oauth/access_token';
  const wrongCode = '잘못된 인증 코드 입니다.';

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

    if (!access_token) throw Error(wrongCode);

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
    const { login, avatar_url } = data;

    return [login, avatar_url];
  } catch (err) {
    throw Error(err);
  }
};

const githubVerify = async (req, done) => {
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
  passport.use('custom-github', new customStrategy(githubVerify));
};
