const express = require('express');
const usersRouter = require('@/routes/users');
const issuesRouter = require('@/routes/issue');
const labelRouter = require('@/routes/labels');
const router = express.Router();

router.use('/users', usersRouter);
router.use('/issues', issuesRouter);
router.use('/labels', labelRouter);

module.exports = router;
