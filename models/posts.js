const mongoose = require('mongoose');
const User = require('./users');
const Comment = require('./comments');
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    Image: {
        type: String,

    },
    PostedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    LikedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    Comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]

})
module.exports = mongoose.model('Post', postSchema);