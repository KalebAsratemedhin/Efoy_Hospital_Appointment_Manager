const express = require('express');
const router = express.Router();
const bookingController = require("../controllers/booking");
const { authenticateUser } = require('../middlewares/auth');

router.get('/patient/:patientId', authenticateUser, bookingController.patientSummary);
router.get('/doctor/:doctorId', authenticateUser, bookingController.doctorSummary);


router.get('/:id', authenticateUser, bookingController.findOneBooking);
router.get('/', authenticateUser, bookingController.findAllUserBookings);
router.get('/:doctorId/:date', authenticateUser, bookingController.findAvailableTimeSlots);

router.post('/', authenticateUser, bookingController.createBooking);
router.put('/:id', authenticateUser, bookingController.updateBooking);
router.delete('/:id', authenticateUser, bookingController.deleteBooking);

module.exports = router;
