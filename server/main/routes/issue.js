const express = require('express');
const IssueController = require('@/controllers/issue');
const { authenticateUser } = require('@/utils/middleware');
const router = express.Router();

router.get('/', authenticateUser, IssueController.getAllIssues);

module.exports = router;
