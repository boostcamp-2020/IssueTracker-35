const express = require('express');
const usersRouter = require('@/routes/user');
const issuesRouter = require('@/routes/issue');
const labelRouter = require('@/routes/label');
const commentRouter = require('@/routes/comment');
const router = express.Router();

router.use('/users', usersRouter);
router.use('/issues', issuesRouter);
router.use('/labels', labelRouter);
router.use('/comments', commentRouter);

module.exports = router;
