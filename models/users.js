const mongoose=require('mongoose');


const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        unique:true,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    following:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}],
    followers:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}]

})

module.exports=mongoose.model('User',userSchema);