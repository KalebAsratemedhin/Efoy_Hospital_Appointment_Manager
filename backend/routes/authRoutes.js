const express = require('express');
const authController = require('../controllers/authController.js')
const authenticateToken = require('../middlewares/authenticateToken.js')


const router = express.Router();
 
router.get('/current-user', authenticateToken,  authController.getUser)

router.post('/signup', authController.signup);

router.post('/signin', authController.login)

router.post('/signout', authController.logout)



module.exports = router