const express = require('express');
const router = express.Router();

const messageController = require('../controllers/message-controller');
const { authenticate } = require('../auth/authenticate');

router.get("/chats", authenticate, messageController.fetchChats)
router.get("/:chatId", authenticate, messageController.getMessage);
router.post("/", authenticate, messageController.sendMessage);
router.post("/chats", authenticate, messageController.accessChat)


module.exports = router;