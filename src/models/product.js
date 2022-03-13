const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
    _id:Number,
    name:{
        type:String,
        unique:1,
        lowercase:true,
    },

    price:{
        type:Number,
    },
    image:String,
    option:String

})

const Product = mongoose.model('product',productSchema);
module.exports = {Product};