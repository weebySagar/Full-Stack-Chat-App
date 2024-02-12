const express = require('express');
const router = express.Router();

const messageController = require('../controllers/message-controller');
const { authenticate } = require('../auth/authenticate');

router.post('/send',authenticate,messageController.sendMessage);


module.exports = router;