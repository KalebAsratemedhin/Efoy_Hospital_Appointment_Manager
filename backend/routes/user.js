const express = require('express');
const router = express.Router();
const userController = require("../controllers/user");
const passport = require('../strategies/jwt_strategy');

router.get('/:id', passport.authenticate('jwt', { session: false }), userController.findOneUser);
router.get('/', passport.authenticate('jwt', { session: false }), userController.findAllUsers);
  
module.exports = router; 
  