import { requestGET, requestPOST, requestPUT, requestPATCH } from '@/api';

const BASE_ISSUES_PATH = '/issues';

const TARGET_ISSUE_PATH = issueId => `${BASE_ISSUES_PATH}/${issueId}`;
const TARGET_ISSUE_ASSIGNEE_PATH = issueId =>
  `${BASE_ISSUES_PATH}/${issueId}/assignees`;
const TARGET_ISSUE_LABEL_PATH = issueId =>
  `${BASE_ISSUES_PATH}/${issueId}/labels`;

export const issueAPI = {
  getAllIssues: () => requestGET(BASE_ISSUES_PATH),
  submitIssue: issue => requestPOST(BASE_ISSUES_PATH, issue),
  getIssue: issueId => requestGET(TARGET_ISSUE_PATH(issueId)),

  submitComment: (issueId, content) =>
    requestPOST(TARGET_ISSUE_PATH(issueId), { content }),

  changeAssignees: (issueId, assignees) =>
    requestPUT(TARGET_ISSUE_ASSIGNEE_PATH(issueId), { assignees }),

  changeLabels: (issueId, labels) =>
    requestPUT(TARGET_ISSUE_LABEL_PATH(issueId), { labels }),

  updateTitle: (issueId, title) =>
    requestPATCH(TARGET_ISSUE_PATH(issueId), { title }),
};
