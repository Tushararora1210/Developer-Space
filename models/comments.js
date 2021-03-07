const mongoose = require('mongoose');
const User = require('./users')

const commentSchema = new mongoose.Schema({
    commentedby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    commenttext: {
        type: String
    }
})
module.exports = mongoose.model('Comment', commentSchema);