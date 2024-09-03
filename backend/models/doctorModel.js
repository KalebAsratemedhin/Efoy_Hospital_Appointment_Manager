const mongoose = require('mongoose');

const doctorSchema = mongoose.Schema(
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
