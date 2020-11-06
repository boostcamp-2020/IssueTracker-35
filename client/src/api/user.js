import { requestGET, requestPOST } from '@/api';

const GITHUB_LOGIN_PATH = '/users/login/github';
const CURRENT_USER_PATH = '/users/me';

export const gitHubLoginAPI = {
  getUrl: () => requestGET(GITHUB_LOGIN_PATH),
  getToken: code => requestPOST(GITHUB_LOGIN_PATH, { code }),
};

export const userAPI = {
  getCurrentUser: () => requestGET(CURRENT_USER_PATH),
};
