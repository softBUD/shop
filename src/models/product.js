const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
    id:mongoose.Schema.Types.ObjectId,
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

const Product = mongoose.model('products',productSchema);
module.exports = {Product};