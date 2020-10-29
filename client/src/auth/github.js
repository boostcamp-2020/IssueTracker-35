import { useEffect } from 'react';
import axios from 'axios';
import qs from 'qs';

function GitHubCallback({ cb, history, location }) {
  const getToken = async () => {
    const { code } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });

    try {
      const { token } = axios.post('http://localhost:3000/users/login/github', { code });
      localStorage.setItem('token', token);
      cb(token);
      history.push('/');
    } catch (err) {
      history.push('/error');
    }
  };
  useEffect(getToken, [history, location]);

  return null;
}

export default GitHubCallback;
