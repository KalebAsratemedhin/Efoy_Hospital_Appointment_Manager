const mongoose = require('mongoose');

const ratingSchema = mongoose.Schema({
    raterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    value: {
        type: Number,
        required: true,
        min: 0,  
        max: 5   
    }
}, {
    timestamps: true  
});

const Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;
