const mongoose = require('mongoose');

const doctorSchema = mongoose.Schema(
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
        speciality: {
            type: String,
            required: true
        },
        experience: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: String,
            required: true
        }
    }
)

const Doctor = mongoose.model('Doctor', doctorSchema)

module.exports = Doctor
