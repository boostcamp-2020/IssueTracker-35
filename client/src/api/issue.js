import { requestGET, requestPOST } from '@/api';

const BASE_ISSUES_PATH = '/issues';

export const issueAPI = {
  getAllIssues: () => requestGET(BASE_ISSUES_PATH),
  submitIssue: issue => requestPOST(BASE_ISSUES_PATH, issue),
};
