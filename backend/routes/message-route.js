const express = require('express');
const router = express.Router();

const messageController = require('../controllers/message-controller');
const { authenticate } = require('../auth/authenticate');

router.post("/",authenticate,messageController.sendMessage);
router.get("/",authenticate,messageController.getMessage);


module.exports = router;