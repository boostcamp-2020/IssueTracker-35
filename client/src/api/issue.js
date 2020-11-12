import { requestGET, requestPOST } from '@/api';

const BASE_ISSUES_PATH = '/issues';

const TARGET_ISSUE_PATH = issueId => `${BASE_ISSUES_PATH}/${issueId}`;

export const issueAPI = {
  getAllIssues: () => requestGET(BASE_ISSUES_PATH),
  submitIssue: issue => requestPOST(BASE_ISSUES_PATH, issue),
  getIssue: issueId => requestGET(TARGET_ISSUE_PATH(issueId)),
  submitComment: (issueId, content) =>
    requestPOST(TARGET_ISSUE_PATH(issueId), { content }),
};
