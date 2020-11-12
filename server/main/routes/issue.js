const express = require('express');
const issueController = require('@/controllers/issue');
const { authenticateUser } = require('@/utils/middleware');
const router = express.Router();

router.get('/', authenticateUser, issueController.getAllIssues);
router.get(
  '/:issueID',
  authenticateUser,
  issueController.isValidIssueID,
  issueController.getIssueDetails
);
router.post(
  '/',
  authenticateUser, // passport 체크
  issueController.isValidParams, // 유효성 검사
  issueController.createIssue // issue 생성
);

module.exports = router;
