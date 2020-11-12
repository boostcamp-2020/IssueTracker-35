const express = require('express');
const commentController = require('@/controllers/comment');
const { authenticateUser, isValidCommentID } = require('@/utils/middleware');
const router = express.Router();

router.patch(
  '/:commentID',
  authenticateUser,
  isValidCommentID,
  commentController.updateComment
);

module.exports = router;
