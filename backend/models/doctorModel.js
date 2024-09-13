const mongoose = require('mongoose');

const doctorSchema = mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
        },
        phoneNumber: {
            type: String,
        },
        sex: {
            type: String,
        },
        address: {
            type: String,
        },
        age: {
            type: Number,
        },

        profilePic: {
            type: String
        },
        rating: {
            type: Number
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
        }
    }
)

const Doctor = mongoose.model('Doctor', doctorSchema)

module.exports = Doctor
