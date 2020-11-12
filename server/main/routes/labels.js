const express = require('express');
const labelController = require('@/controllers/label');

const { authenticateUser } = require('@/utils/middleware');
const router = express.Router();

router.get('/', authenticateUser, labelController.getAllLabels);

module.exports = router;
