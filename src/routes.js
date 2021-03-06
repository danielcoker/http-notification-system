const express = require('express');

const { createSubscription } = require('./controllers');

const router = express.Router();

router.post('/subscribe/:topic', createSubscription);

module.exports = router;
