const express = require('express');
const commentController = require('@/controllers/comment');
const {
  authenticateUser,
  isValidCommentID,
  isUserAuthorOfComment,
} = require('@/utils/middleware');
const router = express.Router();

router.patch(
  '/:commentID',
  authenticateUser,
  isValidCommentID,
  isUserAuthorOfComment,
  commentController.updateComment
);

module.exports = router;
