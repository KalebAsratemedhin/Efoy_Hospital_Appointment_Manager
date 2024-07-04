const express = require('express');
const authController = require('../controllers/authController.js')
const authenticateToken = require('../middlewares/authenticateToken.js')


const router = express.Router();
 
router.get('/', authenticateToken,  authController.getUser)

router.post('/signup', authController.signup);

router.post('/login', authController.login)

router.get('/logout', authController.logout)



module.exports = router