const express = require('express');
const router = express.Router();

const userController = require('../controllers/user-controller');
const { authenticate } = require('../auth/authenticate');


router.post('/signup', userController.addUser);
router.post('/login', userController.loginUser);
router.get('/', authenticate, userController.getSearchedUser)
router.put('/update', authenticate, userController.updateUser)


module.exports = router