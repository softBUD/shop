const mongoose = require('mongoose');
const listNumSchema = mongoose.Schema({
    id:mongoose.Schema.Types.ObjectId,
    totalPost:Number,
    name:String
})

const ListNum = mongoose.model('listnum',listNumSchema);
module.exports = {ListNum};