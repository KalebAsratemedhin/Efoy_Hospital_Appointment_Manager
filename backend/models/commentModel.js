const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    commenterId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Patient",
        requried: true
    },

    doctorId:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Doctor",
        requried: true
    },
    
    content: {
        type: String,
        requried: true,
    },
    
})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment