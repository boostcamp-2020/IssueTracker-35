const express = require('express');
const userController = require('../controllers/user');
const passport = require('passport');
const router = express.Router();

router.get('/login/github', userController.getGithubLoginUrl);
router.post('/login/github', passport.authenticate('custom-github', { session: false }), userController.generateToken);

module.exports = router;
