const mongoose=require('mongoose');
const User=require('./users');
const experienceSchema=new mongoose.Schema({
    Companyname:String,
    From:Date,
    To:Date,
    current:{
        type:Boolean,
        default:true
    }
})
const profileSchema=new mongoose.Schema({
user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
},
bio:String,
skills:[{type:String}],
experience:[{type:mongoose.Schema.Types.ObjectId,ref:'Experience'}],
resume:""
})
const Profile=mongoose.model('Profile',profileSchema)
const Experience=mongoose.model('Experience',experienceSchema)
module.exports={Profile,Experience};