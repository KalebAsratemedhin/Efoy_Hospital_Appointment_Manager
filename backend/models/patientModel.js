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
            unique: true,

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
        gender: {
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
        }
    }
)

const Patient = mongoose.model('Patient', patientSchema)
module.exports = Patient
