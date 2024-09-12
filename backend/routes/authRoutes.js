const express = require('express');
const authController = require('../controllers/authController.js')
const authenticateToken = require('../middlewares/authenticateToken.js')
const passport = require('passport');



const router = express.Router();
 
router.get('/current-user', authenticateToken,  authController.getUser)

router.post('/signup', authController.signup);

router.post('/signin', authController.login)

router.post('/signout', authController.logout)

router.get('/google', (req, res, next) => {
    console.log('Google Auth Request Initiated');
    next();
  }, passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', (req, res, next) => {
    console.log('Google Auth Callback Initiated');
    next();
  }, passport.authenticate('google', { session: false }), authController.googleAuthSuccess);


module.exports = router