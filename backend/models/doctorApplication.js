const mongoose = require('mongoose');

const doctorApplicationSchema = mongoose.Schema({
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    orgID: {
        type: String,
        required: true
    },
    speciality: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    educationLevel: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],  
        default: 'pending'
    },
    appliedAt: {
        type: Date,
        default: Date.now
    }
});

const DoctorApplication = mongoose.model('DoctorApplication', doctorApplicationSchema);
module.exports = DoctorApplication;
