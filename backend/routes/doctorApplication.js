const express = require('express');
const router = express.Router();
const {
    createApplication,
    updateApplication,
    evaluateApplication,
    deleteApplication,
    getAllApplications,
    getOneApplication
} = require('../controllers/doctorApplication');

const { authenticateUser, isAdmin } = require('../middlewares/auth.js');

router.post('/applications', authenticateUser, createApplication);

router.put('/applications', authenticateUser, updateApplication);

router.put('/applications/:applicationId/evaluate', authenticateUser, isAdmin, evaluateApplication);

router.delete('/applications', authenticateUser, deleteApplication);

router.get('/applications', authenticateUser, isAdmin, getAllApplications);

router.get('/applications/:applicationId', authenticateUser, getOneApplication);

module.exports = router;
