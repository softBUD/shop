const mongoose = require('mongoose');
const listNumSchema = mongoose.Schema({
    id:mongoose.Schema.Types.ObjectId,
    totalPost:Number,
    name:String
})

const listNum = mongoose.model('productNum',listNumSchema);
module.exports = {listNum};