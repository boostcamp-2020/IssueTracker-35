import { LOGIN, LOGOUT } from './actions';

// TODO: dispatch(LOGOUT)을 하는 곳에서 localStorage.removeItem(token)으로 지워줘야 함
export default (state, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        token: action.token,
        user: action.user,
      };
    case LOGOUT: {
      return {
        token: undefined,
        user: undefined,
      };
    }
    default:
      throw new Error();
  }
};
