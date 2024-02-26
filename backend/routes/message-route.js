const express = require('express');
const router = express.Router();

const messageController = require('../controllers/message-controller');
const { authenticate } = require('../auth/authenticate');

router.post("/",authenticate,messageController.sendMessage);
router.get("/",authenticate,messageController.getMessage);
router.post("/chats",authenticate,messageController.accessChat)
router.get("/chats",authenticate,messageController.fetchChats)


module.exports = router;