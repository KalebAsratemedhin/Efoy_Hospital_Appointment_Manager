const mongoose = require('mongoose'); 

const userSchema = mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Please enter a valid email address'], 
        },
        role: {
            type: String,
            enum: ['patient', 'doctor'], 
            default: 'patient',
        },
        password: {
            type: String,
            required: function () { return !this.googleId },  
        },
        phoneNumber: {
            type: String,
        },
        sex: {
            type: String,
            enum: ['male', 'female', 'other'],  
        },
        address: {
            type: String,
        },
        age: {
            type: Number,
            min: 0, 
        },
        profilePic: {
            type: String,
        },
        googleId: {  
            type: String,
            unique: true,
        }
    },
    {
        timestamps: true,  
    }
);

const User = mongoose.model('User', userSchema);
module.exports = User;
