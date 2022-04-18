const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = mongoose.Schema({
    _id:{
        type:Number
    },
    wirter:{
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
    }
},{timestamps:true})

const Product = mongoose.model('product',productSchema);
module.exports = {Product};