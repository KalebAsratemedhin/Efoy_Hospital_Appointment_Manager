const mongoose = require('mongoose');

const patientSchema = mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        username: {
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
        },
        gender: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        age: {
            type: Number,
            required: true,
        },

        profilePic: {
            type: String
        }
    }
)

const Patient = mongoose.model('Patient', patientSchema)
module.exports = Patient
