const router=require('express').Router();
const notifications = require('../models/notifications');
const Notification=require('../models/notifications');
const User=require('../models/users')
const auth=require('../auth/requireLogin')
router.get("/",auth,(req,res)=>{
    console.log(req.user[0]._id)
        Notification.find({user:req.user[0]._id})
        .then(notificationsfound=>{
            console.log(notificationsfound);
                return res.json({notifications:notificationsfound[0].notificationtext})
        })
        .catch(err=>{
            console.error(err);
            res.status(422).json({error:err})
        })
    
})
module.exports=router;