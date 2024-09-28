const express = require('express');
const router = express.Router();
const userController = require("../controllers/user");
const { authenticateUser } = require('../middlewares/auth');

router.get('/:id', authenticateUser, userController.findOneUser);
router.get('/', authenticateUser, userController.findAllUsers);
  
module.exports = router; 
  