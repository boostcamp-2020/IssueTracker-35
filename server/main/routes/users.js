const express = require('express');
const userController = require('@/controllers/user');
// const passport = require('passport');
const { passportAuthenticate, authenticateUser } = require('@/utils/middleware');
const router = express.Router();

router.get('/login/github', userController.getGithubLoginUrl);
router.post('/login/github', passportAuthenticate, userController.generateToken);
router.get('/me', authenticateUser, userController.getOwnInfo);

module.exports = router;
