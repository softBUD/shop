const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        trim: true,
        },
        
    password: {
        type: String,
        minlength: 5
        },
    id: {
        type:String,
        minlength: 4,
        maxlength: 15, 
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type:String,
    },
    toeknExp: {
        type: Number
    }
})

const User = mongoose.model('User', userSchema);
module.exports = {User};