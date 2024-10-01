const express = require('express');
const router = express.Router();
const {
    createApplication,
    updateApplication,
    evaluateApplication,
    deleteApplication,
    getAllApplications,
    getOneApplication,
    getMyApplication
} = require('../controllers/doctorApplication');

const { authenticateUser, isAdmin } = require('../middlewares/auth.js');

router.post('/', authenticateUser, createApplication);

router.put('/', authenticateUser, updateApplication);

router.put('/evaluate/:applicationId', authenticateUser, isAdmin, evaluateApplication);

router.delete('/', authenticateUser, deleteApplication);

router.get('/', authenticateUser, isAdmin, getAllApplications);

router.get('/current-user', authenticateUser, getMyApplication);
router.get('/:applicationId', authenticateUser, isAdmin, getOneApplication);


module.exports = router;
