const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { dblClick } = require('@testing-library/user-event/dist/click');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const userSchema = mongoose.Schema({
    email: {
        type: String,
        trim: true,
        unique: 1,
        },
        
    password: {
        type: String,
        minlength: 5
        },
    id: {
        type:String,
        minlength: 4,
        maxlength: 15,
        unique: 1,
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


userSchema.pre('save', function(next) {
    //비밀번호를 암호화시킴
    var user = this;

    if(user.isModified('password')) {
        //비밀번호를 변경할때만 해당 부분 실행
        bcrypt.genSalt(saltRounds,function(err,salt) {
            if(err) return next(err)

            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err)
                user.password = hash
                next()
            })
        })
    } else { //비밀번호를 변경하지 않을때 실행
        next()
    }
   
});


userSchema.methods.comparePassword = function (plainPassword, cb) {
    //사용자가 입력한 비밀번호를 db에 저장된 비밀번호와 비교
    //this.password = user스키마의 비밀번호
    bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
        if(err) return cb(err),
        cb(null,isMatch)
    })
}

userSchema.methods.generateToken = function(cb) {
    var user = this;

    var token = jwt.sign(user._id,  'secretToken')

    // user._id + 'secretToken' = token
    // ->
    // 'secretToken' => user_id

    user.token = token
    user.save(function(err,user) {
        if(err) return cb(err)
        cb(null, user)
    })
}

const User = mongoose.model('User', userSchema);
module.exports = {User};