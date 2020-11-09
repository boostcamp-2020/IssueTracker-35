const express = require('express');
const usersRouter = require('@/routes/users');
const issuesRouter = require('@/routes/issue');
const router = express.Router();

router.use('/users', usersRouter);
router.use('/issues', issuesRouter);

module.exports = router;
