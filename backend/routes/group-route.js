const express = require('express');
const router = express.Router();

const groupController = require('../controllers/group-controller');
const { authenticate } = require('../auth/authenticate');

router.post("/create-group",authenticate,groupController.createGroup);


module.exports = router;