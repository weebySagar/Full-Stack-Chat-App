const express = require('express');
const router = express.Router();

const userController = require('../controllers/user-controller');


router.post('/signup',userController.addUser);
router.post('/login',userController.loginUser);


module.exports= router