const express = require('express');
const router = express.Router();
const {findAllDoctors, findOneDoctor} = require("../controllers/doctor");
const { authenticateUser } = require('../middlewares/auth');

router.get('/', findAllDoctors);
router.get('/:id', authenticateUser, findOneDoctor);

module.exports = router;
