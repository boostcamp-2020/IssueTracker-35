import { requestGET, requestPOST } from '@/api';

const GITHUB_LOGIN_PATH = '/users/login/github';

export const gitHubLoginAPI = {
  getUrl: () => requestGET(GITHUB_LOGIN_PATH),
  getToken: code => requestPOST(GITHUB_LOGIN_PATH, { code }),
};
