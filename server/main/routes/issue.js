const express = require('express');
const issueController = require('@/controllers/issue');
const commentController = require('@/controllers/comment');
const issueLabelController = require('@/controllers/issue-label');
const { authenticateUser } = require('@/utils/middleware');
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
  issueController.isValidIssueID,
  issueController.getIssueDetails
);

router.post(
  '/:issueID/comments',
  authenticateUser,
  issueController.isValidComment,
  commentController.createComment
);

router.post(
  '/',
  authenticateUser, // passport 체크
  issueController.isValidParams, // 유효성 검사
  issueController.createIssue // issue 생성
);

router.put(
  '/:issueID/labels',
  authenticateUser,
  issueLabelController.isValidIssueID,
  issueLabelController.amendIssueLabels
);

module.exports = router;
