const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = mongoose.Schema({
    _id:{
        type:Number
    },
    writer:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    title:{
        type:String,
        unique:1,
        lowercase:true,
    },
    price:{
        type:Number,
    },
    image:{
        type:Array,
        default:[]
    },
    option:String,
    stock:{
        type:Number,
        default: 0
    },
    category:{
        type:String
    }
},{timestamps:true})

const Product = mongoose.model('product',productSchema);
module.exports = {Product};