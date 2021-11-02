const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {type: String},
    content: {type: String},
    completed: {type: Boolean, default: false},
    date: {type: String, default: new Date().toLocaleString()},
    users: {type: mongoose.Schema.Types.ObjectId , ref: 'User'}
})

module.exports.Post = mongoose.model('Post', PostSchema, 'Posts');