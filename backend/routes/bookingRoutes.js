const express = require('express');
const router = express.Router();
const bookingController = require("../controllers/bookingController");
const passport = require('../strategies/jwt_strategy');

router.get('/:id', passport.authenticate('jwt', { session: false }), bookingController.findOneBooking);
router.get('/', passport.authenticate('jwt', { session: false }), bookingController.findAllUserBookings);

router.post('/', passport.authenticate('jwt', { session: false }), bookingController.createBooking);
router.put('/:id', passport.authenticate('jwt', { session: false }), bookingController.updateBooking);
router.delete('/:id', passport.authenticate('jwt', { session: false }), bookingController.deleteBooking);

module.exports = router;
