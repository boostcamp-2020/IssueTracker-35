import { useEffect } from 'react';
import { gitHubLoginAPI } from '@/api/user';
import { LOGIN } from '@/store/user/actions';
import qs from 'qs';

const GitHubCallback = ({ history, location, dispatch }) => {
  const setUser = (token, user) => dispatch({ type: LOGIN, token, user });

  const getToken = async () => {
    const { code } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });

    const {
      data: { token, id, nickname, image },
    } = await gitHubLoginAPI.getToken(code);
    if (!token) history.push('/error');

    localStorage.setItem('token', token);
    setUser(token, { id, nickname, image });

    history.push('/');
  };
  useEffect(getToken, [history, location]);

  return null;
};

export default GitHubCallback;
