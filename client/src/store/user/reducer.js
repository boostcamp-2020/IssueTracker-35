import { LOGIN, LOGOUT } from './actions';

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
