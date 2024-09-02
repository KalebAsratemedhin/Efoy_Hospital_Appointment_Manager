const express = require('express');
const router = express.Router();
const bookingController = require("../controllers/bookingController");
const passport = require('../strategies/jwt_strategy');

router.get('/patient/:patientId', passport.authenticate('jwt', { session: false }), bookingController.patientSummary);
router.get('/doctor/:doctorId', passport.authenticate('jwt', { session: false }), bookingController.doctorSummary);


router.get('/:id', passport.authenticate('jwt', { session: false }), bookingController.findOneBooking);
router.get('/', passport.authenticate('jwt', { session: false }), bookingController.findAllUserBookings);
router.get('/:doctorId/:date', passport.authenticate('jwt', { session: false }), bookingController.findAvailableTimeSlots);

router.post('/', passport.authenticate('jwt', { session: false }), bookingController.createBooking);
router.put('/:id', passport.authenticate('jwt', { session: false }), bookingController.updateBooking);
router.delete('/:id', passport.authenticate('jwt', { session: false }), bookingController.deleteBooking);

module.exports = router;
