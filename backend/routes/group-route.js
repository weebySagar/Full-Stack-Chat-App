const express = require('express');
const router = express.Router();

const groupController = require('../controllers/group-controller');
const { authenticate } = require('../auth/authenticate');

router.post("/create-group", authenticate, groupController.createGroupChat);
router.delete("/:groupId/user/:userId", authenticate, groupController.removeUserFromGroup);
router.post("/:groupId/user/:userId", authenticate, groupController.makeUserAdmin)
router.post("/add-users", authenticate, groupController.addUserToGroup)
router.put("/update", authenticate, groupController.updateGroup)



module.exports = router;