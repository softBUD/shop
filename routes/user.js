
const express = require('express');
const router = express.Router();
const {User} = require('./src/models/user');
const {auth} = require('./middelware/auth');


router.post('/signup', (req,res)=> {
    const user = new User(req.body)
    user.save((err,userInfo) => {
      if (err) return res.json({ sucess: false,err})
      return res.status(200).json({
        success:true
      })
    })
  })
  router.post('/login',(req,res) => {
    //요청된 id db에서 찾기
    //id가 db에 있다면 맞는 비밀번호인지 확인
    //비밀번호까지 맞다면 토큰을 생성
  
      //요청된 이메일을 데이터베이스에서 있는지 찾는다.
      let login = User.findOne({ email: req.body.email }, (err, user) => {
  
        if (!user) {
          return res.json({
            loginSuccess: false,
            message: "제공된 이메일에 해당하는 유저가 없습니다."
          })
        }
  
      user.comparePassword(req.body.password , (err, isMatch) => {
        if(!isMatch)
        return res.json({ loginSuccess: false, message:"비밀번호가 틀렸습니다."})
  
      user.generateToken((err,user)=> {
          if(err) return res.status(400).send(err);
          //쿠키에 토큰을 저장한다.
        res.cookie("x_auth",user.token)
        .status(200)
        .json({loginSuccess:true, userId: user._id})
    
        })
      })
    })
  })
  router.get('/auth',auth,(req,res) => {
    //미들웨어를 통과해오면 auth가 true라는 뜻이다.
    res.status(200).json({
      //role이 0 = 일반유저 0이 아니면 관리자
      _id: req.user._id,
      isAdmin: req.user.role === 0 ? false : true,
      isAuth:true,
      email:req.user.email,
      userName:req.user.userName,
      role:req.user.role,
      image:req.user.image
    })
  
  })
  
  router.get('/logout',auth,(req,res)=>{
    User.findOneAndUpdate({_id:req.user._id}, 
      {token:""},
      (err,user) => {
        if (err) return res.json({success:false,err});
        return res.status(200).send({
          success: true
        })
    })
  })

  module.exports = router;
