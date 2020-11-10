import { requestGET, requestPOST } from '@/api';

const GET_ALL_ISSUES_PATH = '/issues';

export const issueAPI = {
  getAllIssues: () => requestGET(GET_ALL_ISSUES_PATH),
};
