const express = require('express');
const userController = require('../controllers/user');
const router = express.Router();

router.get('/login/github', userController.githubLogin);

module.exports = router;
