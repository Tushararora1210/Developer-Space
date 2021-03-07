const User=require('./users');
const mongoose=require('mongoose');

const notificationSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    notificationtext:[{type:String}]
})

module.exports=mongoose.model('Notification',notificationSchema);