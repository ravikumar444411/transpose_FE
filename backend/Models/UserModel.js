
let mongoose = require('mongoose');

//Schema
let userSchema = new mongoose.Schema({
    incr : {
        type: Number,
        required: true,
        default: 0
    },
    fname: {
        type: String,
        required: true,
        default: ''
    },
    lname: {
        type: String,
        required: true,
        default: ''
    },
    username: {
        type: String,
        required: true,
        default: ''
    },
    email: {
        type: String,
        required: true,
        default: ''
    },
    password: {
        type: String,
        required: true,
        default: ''
    }
});
userSchema.index({incr : 1, username : 1});

//Model
let User = mongoose.model('User',userSchema,'User');

module.exports = User;