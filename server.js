require('dotenv').config();
const express = require('express')
const app = express();
const path = require('path');
const multer = require('multer');
const mongoose = require('mongoose');
const {User} = require('./src/models/user');
const {Product} = require('./src/models/product');
const {ListNum} = require('./src/models/listnum');
const cookieParser = require('cookie-parser');
const {auth} = require('./middelware/auth');
const bodyParser = require('body-parser');
const { faArrowRightRotate, faLessThanEqual } = require('@fortawesome/free-solid-svg-icons');
const { privateDecrypt } = require('crypto');
const { off } = require('process');
const port = process.env.PORT || 5000;


app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

const URI = process.env.MONGO_URI;

mongoose
  .connect(URI)
  .then(() => console.log('MongoDB Connected!!'))
  .catch((e) => console.log(e));

app.get('/', (req, res) => {
  res.send('Hello world!!');
});

app.post('/api/user/signup', (req,res)=> {
  const user = new User(req.body)
  user.save((err,userInfo) => {
    if (err) return res.json({ sucess: false,err})
    return res.status(200).json({
      success:true
    })
  })
})
app.post('/api/user/login',(req,res) => {
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
app.get('/api/user/auth',auth,(req,res) => {
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

app.get('/api/user/logout',auth,(req,res)=>{
  User.findOneAndUpdate({_id:req.user._id}, 
    {token:""},
    (err,user) => {
      if (err) return res.json({success:false,err});
      return res.status(200).send({
        success: true
      })
  })
})
app.post('/api/product/upload',(req,res)=> {
  const product = new Product(req.body);
  ListNum.findOne({name:"productNumber"},
  (err,result)=> {
    if (err) return res.json({success:false,err});
    const total = result.totalPost;
    product.save((err,productInfo) => {
    if (err) return res.json({ sucess: false, err});
    })
    product._id = total + 1;
  })
  ListNum.findOneAndUpdate({name:"productNumber"},
    {$inc: {totalPost:1}},
    {new:true},
    (err,total)=> {
      if(err) return res.json({success:false,err})
      return res.status(200).json({
        success:"total갱신"
      })
    })
})
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
})

const upload = multer({ storage: storage }).single("file")

app.post('/api/product/image', (req,res) => {
  
  upload(req,res, err => {
    if(err) {
      return res.json({success:false, err})
    }
    return res.json({
      success: true,
      filePath: res.req.file.path,
      fileName: res.req.file.filename,
    });
  })
})

app.post("/api/product/get", (req,res) => {
  //product collection에 들어있는 모든 상품 가져옴
  //더보기 기능을 위한 변수들
  //postSize : 데이터의 length, 불러온 상품 갯수
  //skip: n번째 데이터부터 시작

  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip) ?  parseInt(req.body.skip) : 0;
  let searchTerm = req.body.searchTerm
  const regex = new RegExp(searchTerm,"i")


  if(searchTerm) {
    Product.find()
      .find({title: {"$regex":regex}})
      .skip(skip)
      .limit(limit)
      .exec((err,productInfo) => {
      if(err) return res.json({success:false,err})
      return res.status(200).json({success: true, productInfo})
      })
  } else {
    ListNum.findOne({name:"productNumber"},
  (err,result)=> {
    if (err) return res.json({success:false,err});
    const total = result.totalPost;
    Product.find()
      .skip(skip)
      .limit(limit)
      .exec((err,productInfo) => {
      if(err) return res.json({success:false,err})
      return res.status(200).json({success: true, productInfo, total: total})
      })
    })   
  }
})

app.post ("/api/product/category", (req,res) => {

    Product.findOne({"category":{$eq:req.body.category}},(err,productInfo) => {
    if(err) return res.json({success:false,err})
    return res.status(200).json({success:true, productInfo})
  })
})

app.get("/api/product/products_by_id", (req,res) => {
  let type = req.query.type
  let productId = req.query.id
  Product.find({'_id':{ $in:productId }})
      .exec((err,productInfo) => {
      if(err) return res.json({success:false,err})
      return res.status(200).json({success: true, productInfo})
      })
})
app.post("/api/product/addToCart", auth, (req,res) => {
  //1.해당하는 유저 정보를 가져옴

  User.findOne({ _id: req.user._id},
    (err,userInfo) => {
      let duplicate = false;
      //2. 가져온 정보에서 카트에 넣으려하는 상품이 이미 존재하는지 확인
      userInfo.cart.forEach((item)=>{
        if(item.id === req.body.productId)
          duplicate = true;
      })

      if(duplicate) {
        //이미 상품이 있음
        User.findOneAndUpdate({_id:req.user._id, "cart.id":req.body.productId},
          {$inc : { "cart.$.quantity": 1 }},
          {new:true},
          (err,userInfo) => {
            if(err) return res.status(400).json({success: false,err})
            res.status(200).send(userInfo.cart)
          })
      } else {
        User.findOneAndUpdate(
          { _id: req.user._id },
          {
            $push:{
              cart:{
                id:req.body.productId,
                quantity:1,
                date:Date.now()
            }
          }
        }, {new:true},
        (err,userInfo) => {
          if(err) return res.status(400).json({success: false,err})
            res.status(200).send(userInfo.cart)
          }
        )
      }
    })

  
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.get('*', (req, res) => {
  res.header("Access-Control-Allow-Origin","*");
  res.sendFile(path.join(__dirname, '/public/index.html'));
});
