import React from 'react';
import axios from 'axios';
import BASE_URL from '../const/url.js';

const LoginContainer = () => {
  const githubLoginHandler = async () => {
    const {
      data: { url },
    } = await axios.get(`${BASE_URL}/users/login/github`);

    location.href = url;
  };

  return (
    <div>
      <button onClick={githubLoginHandler}> Github Login </button>
    </div>
  );
}

export default LoginContainer;
