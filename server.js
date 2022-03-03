
require('dotenv').config();
const express = require('express')
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const {User} = require('./src/models/user');
const port = process.env.PORT || 5000;



app.use(express.json());

app.use(express.urlencoded({extended:true}))



const URI = process.env.MONGO_URI;
mongoose
  .connect(URI)
  .then(() => console.log('MongoDB Connected!!'))
  .catch((e) => console.log(e));

app.get('/', (req, res) => {
  res.send('Hello world!!');
});
app.get('/api/landing',(req,res)=> res.send("hello!!!!"));

app.post('/add', (req,res)=> {
  const user = new User(req.body)
  user.save((err,userInfo) => {
    if (err) return res.json({ sucess: false,err})
    return res.status(200).json({
      success:true
    })
  })
})
app.post('/login',(req,res) => {
  //요청된 id db에서 찾기
  //id가 db에 있다면 맞는 비밀번호인지 확인
  //비밀번호까지 맞다면 토큰을 생성

  User.findOne({ id: req.body.id }, (err, user) => {
    if(!user) {
      return res.json({
        loginSuccess: false,
        message: "아이디에 해당하는 유저가 없습니다."
      })
    }

    user.comparePassword(req.body.password , (err, isMatch) => {
      if(!isMatch)
      return res.json({ loginSuccess: false, message:"비밀번호가 틀렸습니다."})

      user.generateToken((err,user)=> {
        if(err) return res.status(400).send(err);
        //토큰을 저장한다.
        

      })
    })
  })


})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.get('*', function (요청, 응답) {
  응답.sendFile(path.join(__dirname, '/public/index.html'));
});