const express = require('express');
const userController = require('@/controllers/user');

const {
  passportAuthenticate,
  authenticateUser,
} = require('@/utils/middleware');
const router = express.Router();

router.get('/login/github', userController.getGithubLoginUrl);
router.post(
  '/login/github',
  passportAuthenticate,
  userController.generateToken
);
router.get('/', authenticateUser, userController.getAllUsers);
router.get('/me', authenticateUser, userController.getOwnInfo);

module.exports = router;
