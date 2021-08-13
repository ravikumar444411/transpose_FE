
let mongoose = require('mongoose');

// User schema
let userSchema = new mongoose.Schema({
    incr : {
        type: Number,
        // required: true,
        default: 0
    },
    username: {
        type: String,
        // required: true,
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

// Stores the records in sorted way according to increasing incr and alphabetically increasing username
userSchema.index({incr : 1, username : 1});

// User Model
let User = mongoose.model('User',userSchema,'User');

module.exports = User;