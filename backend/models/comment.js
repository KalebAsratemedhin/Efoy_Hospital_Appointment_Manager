const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    commenterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    content: {
        type: String,
        required: true,
        minlength: 1,  
    }
}, {
    timestamps: true 
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
