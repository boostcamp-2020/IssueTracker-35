const express = require('express');
const commentController = require('@/controllers/comment');
const { authenticateUser } = require('@/utils/middleware');
const router = express.Router();

router.patch('/:commentID', authenticateUser, commentController.updateComment);

module.exports = router;
