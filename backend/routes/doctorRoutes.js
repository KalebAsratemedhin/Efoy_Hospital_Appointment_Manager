const express = require('express');
const router = express.Router();
const doctorController = require("../controllers/doctor");
const passport = require('../strategies/jwt_strategy');

router.get('/',  doctorController.findAllDoctors);
router.get('/:id', passport.authenticate('jwt', { session: false }), doctorController.findOneDoctor);

module.exports = router;
