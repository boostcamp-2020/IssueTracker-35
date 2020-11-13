import { requestGET, requestPOST } from '@/api';

const DEFAULT_USER_PATH = '/users';
const CURRENT_USER_PATH = '/users/me';
const GITHUB_LOGIN_PATH = '/users/login/github';

export const gitHubLoginAPI = {
  getUrl: () => requestGET(GITHUB_LOGIN_PATH),
  getToken: code => requestPOST(GITHUB_LOGIN_PATH, { code }),
};

export const userAPI = {
  getCurrentUser: () => requestGET(CURRENT_USER_PATH),
  getAllUsers: () => requestGET(DEFAULT_USER_PATH),
};
