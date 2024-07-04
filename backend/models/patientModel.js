const mongoose = require('mongoose');

const patientSchema = mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            requried: true
        },
        phoneNumber: {
            type: String,
            required: true
        }
    }
)

const Patient = mongoose.model('Patient', patientSchema)
module.exports = Patient
