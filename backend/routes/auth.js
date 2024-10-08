const express = require('express');
const authController = require('../controllers/auth.js')
const {isAdmin, authenticateUser} = require('../middlewares/auth.js')
const passport = require('passport');

const router = express.Router();
 

router.post('/signup', authController.signup);

router.post('/signin', authController.login)

router.post('/signout', authController.logout)

router.get('/google', (req, res, next) => {
  console.log('initiated')
    next();
  }, passport.authenticate('google', {
  scope: ['profile', 'email']  
}));

router.get('/google/callback', (req, res, next) => {
  console.log('done' )

    next(); 
  }, passport.authenticate('google', { session: false }), authController.googleAuthSuccess);


router.get('/auth/error', (req, res) => {
    res.status(401).json({ error: 'Google OAuth authentication failed' });
});

module.exports = router