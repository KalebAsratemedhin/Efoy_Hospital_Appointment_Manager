const mongoose = require('mongoose')

const ratingSchema = mongoose.Schema({
    raterId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Patient",
        requried: true
    },

    doctorId:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Doctor",
        requried: true
    },
    
    value: {
        type: Number,
        requried: true,
    },
    
})

const Rating = mongoose.model('Rating', ratingSchema)

module.exports = Rating