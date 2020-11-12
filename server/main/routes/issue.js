const express = require('express');
const issueController = require('@/controllers/issue');
const issueLabelController = require('@/controllers/issue-label');
const assignmentController = require('@/controllers/assignment');
const { authenticateUser, isValidIssueID } = require('@/utils/middleware');
const router = express.Router();

router.get('/', authenticateUser, issueController.getAllIssues);

router.post(
  '/',
  authenticateUser, // passport 체크
  issueController.isValidParams, // 유효성 검사
  issueController.createIssue // issue 생성
);

router.get(
  '/:issueID',
  authenticateUser,
  isValidIssueID,
  issueController.getIssueDetails
);

router.put(
  '/:issueID/labels',
  authenticateUser,
  isValidIssueID,
  issueLabelController.amendIssueLabels
);

router.put(
  '/:issueID/assignees',
  authenticateUser,
  isValidIssueID,
  assignmentController.amendAssignments
);

module.exports = router;
