const express = require('express');
const router = express.Router();
const { getUser, findOneUser, findAllUsers, updateUser, updateProfilePicture, adminStats} = require("../controllers/user");
const { authenticateUser, isAdmin } = require('../middlewares/auth');

router.get('/current-user', authenticateUser,  getUser)

router.get('/admin-stats', authenticateUser, isAdmin, adminStats);
router.get('/:id', authenticateUser, findOneUser);
router.get('/', authenticateUser, findAllUsers);
router.put('/:id', authenticateUser, updateUser);
router.put('/profile-pic/:id', authenticateUser, updateProfilePicture);


  
module.exports = router; 
  