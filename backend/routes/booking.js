const express = require('express');
const router = express.Router();
const {
    findAllUserBookings,
    findOneBooking,
    findRecentBooking,
    findAvailableTimeSlots,
    patientSummary,
    doctorSummary,
    createBooking,
    updateBooking,
    deleteBooking
} = require("../controllers/booking");
const { authenticateUser } = require('../middlewares/auth');

router.get('/patient/:patientId', authenticateUser, patientSummary);
router.get('/doctor/:doctorId', authenticateUser, doctorSummary);


router.get('/recent', authenticateUser, findRecentBooking);
router.get('/:id', authenticateUser, findOneBooking);

router.get('/', authenticateUser, findAllUserBookings);
router.get('/:doctorId/:date', authenticateUser, findAvailableTimeSlots);

router.post('/', authenticateUser, createBooking);
router.put('/:id', authenticateUser, updateBooking);
router.delete('/:id', authenticateUser, deleteBooking);

module.exports = router;
