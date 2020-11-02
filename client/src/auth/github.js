import { useEffect } from 'react';
import { gitHubLoginAPI } from '@/api/user';
import qs from 'qs';

const GitHubCallback = ({ cb, history, location }) => {
  const getToken = async () => {
    const { code } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });

    const {
      data: { token },
    } = await gitHubLoginAPI.getToken(code);
    if (!token) history.push('/error');

    cb(token);
    localStorage.setItem('token', token);
    history.push('/');
  };
  useEffect(getToken, [history, location]);

  return null;
};

export default GitHubCallback;
