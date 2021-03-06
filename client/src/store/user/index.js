import React, { createContext, useEffect, useReducer } from 'react';
import { userAPI } from '@/api/user';
import reducer from './reducer';
import { LOGIN, LOGOUT } from './actions';

const UserContext = createContext();

const initState = {
  token: localStorage.getItem('token'),
  user: undefined,
};

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState);

  const getCurrentUserFromToken = async () => {
    const { token, user } = state;

    if (token && !user) {
      const {
        data: { id, nickname, image },
      } = await userAPI.getCurrentUser();
      dispatch(
        id
          ? { type: LOGIN, token, user: { id, nickname, image } }
          : { type: LOGOUT }
      );
    }
  };

  useEffect(getCurrentUserFromToken, []);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
