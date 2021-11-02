const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: { type: String},
    email: {type: String},
    password: {type: String},
    posts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}]


})

module.exports.User = mongoose.model('User', UserSchema, 'User');