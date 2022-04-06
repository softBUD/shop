const express = require('express');
const router = express.Router();
const {Product} = require('./src/models/product');
const {ListNum} = require('./src/models/listnum');

router.post('/add',(req,res)=> {
    const product = new Product(req.body);
    
    ListNum.findOne({name:"productNumber"},
    (err,result)=> {
      if (err) return res.json({success:false,err});
      const total = result.totalPost;
      product.save((err,productInfo) => {
      if (err) return res.json({ sucess: false, err})
      return res.status(200).json({
          success:"datasave"
        })
      })
      product._id = total + 1;
    })
  
    ListNum.findOneAndUpdate({name:"productNumber"},
      {$inc: {totalPost:1}},
      (err,total)=> {
        if(err) return res.json({success:false,err})
        return res.status(200).json({
          success:"total갱신"
        })
      })
  })
  
  router.post('/listnum',(req,res)=>{
    const listnum = new ListNum(req.body);
    listnum.save((err,number) => {
      if (err) return res.json({success:false,err})
      return res.status(200).json({
        success:true
      })
    })
  })
  

router.post("/image",(req,res)=> {
    //이미지 저장하기
})
  module.exports = router;