const jwt=require('jsonwebtoken');
const User=require('../models/users');

module.exports=(req,res,next)=>{
    const {authorization}=req.headers;
    const token=authorization.split(" ")[1];  //authorization: bearer {token}
    console.log(token," ",process.env.JWT_SECRET_KEY);
    const user=jwt.verify(token,process.env.JWT_SECRET_KEY);
    console.log(user)
    User.find({_id:user.id}).select("-password")
    .then((chkuser)=>{
        if(!chkuser.length)
        {
            return res.status(400).json({error:"User doesnot exist"});
        }
        req.user=chkuser;

        next()
    })
    .catch(err=>{
        console.error(err);
        res.status(422).json({error:err})
    })
}