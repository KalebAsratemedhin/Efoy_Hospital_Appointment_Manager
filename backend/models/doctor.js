const mongoose = require('mongoose');

const doctorSchema = mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        rating: {
            type: Number,
            min: 0,  
            max: 5, 
            default: 0  
        },
        orgID: {
            type: String,
            required: true,
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
    },
    {
        timestamps: true  
    }
);

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;