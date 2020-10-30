import { useEffect } from 'react';
import BASE_URL from '../const/url.js';
import axios from 'axios';
import qs from 'qs';

const GitHubCallback = ({ cb, history, location }) => {
  const getToken = async () => {
    const { code } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });

    try {
      const url = `${BASE_URL}/users/login/github`;
      const {
        data: { token },
      } = await axios.post(url, { code });

      cb(token);
      localStorage.setItem('token', token);
      history.push('/');
    } catch (err) {
      history.push('/error');
    }
  };
  useEffect(getToken, [history, location]);

  return null;
}

export default GitHubCallback;
