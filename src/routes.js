const express = require('express');

const { createSubscription, publishMessage } = require('./controllers');

const router = express.Router();

router.post('/publish/:topic', publishMessage);

router.post('/subscribe/:topic', createSubscription);

module.exports = router;
