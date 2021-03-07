const User=require('./users');
const mongoose=require('mongoose');

const messageSchema=new mongoose.Schema({
    text:{
        type:String,
        required:true
    },
    sentby:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    recievedby:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports=mongoose.model('Message',messageSchema);