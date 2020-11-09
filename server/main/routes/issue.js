const express = require('express');
const issueController = require('@/controllers/issue');
const { authenticateUser } = require('@/utils/middleware');
const router = express.Router();

router.get('/', authenticateUser, issueController.getAllIssues);

module.exports = router;
