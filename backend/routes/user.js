const express = require('express');
const router = express.Router();
const {findOneUser, findAllUsers, updateUser} = require("../controllers/user");
const { authenticateUser } = require('../middlewares/auth');

router.get('/:id', authenticateUser, findOneUser);
router.get('/', authenticateUser, findAllUsers);
router.put('/:id', authenticateUser, updateUser);

  
module.exports = router; 
  