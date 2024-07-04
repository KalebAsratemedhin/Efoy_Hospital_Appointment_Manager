const express = require('express');
const router = express.Router();
const patientController = require("../controllers/patientController");
const passport = require('../strategies/jwt_strategy');

router.get('/:id', passport.authenticate('jwt', { session: false }), patientController.findOnePatient);
router.get('/', passport.authenticate('jwt', { session: false }), patientController.findAllPatients);

module.exports = router;
