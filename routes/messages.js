const router = require('express').Router();
const auth = require('../auth/requireLogin');
const messages = require('../models/messages');
const Message = require('../models/messages');
const User = require('../models/users');
router.get('/:username', auth, (req, res) => {
    User.find({ username: req.params.username })
        .then(founduser => {
            if (!founduser.length) {
                return res.status(422).json({ error: "No user with this username found" })
            }
            Message.find({ $or: [{ sentby: req.user[0]._id }, { recievedby: req.user[0]._id }, { sentby: founduser[0]._id }, { recievedby: founduser[0]._id }] })
                .then(messages => {
                    console.log(messages)
                    messages.sort((a, b) => b.date - a.date)
                    res.json({ messages })
                })
        })

})

router.post('/sendmessage/:username',auth,(req,res)=>{
    User.find({username:req.params.username})
    .then(userfound=>{
        if(!userfound.length)
        {
            return res.status(422).json({error:"No user with this username found"})
        }

        const {text}=req.body;
        const message=new Message({
            text,
            sentby:req.user[0]._id,
            recievedby:userfound[0]._id

        })
        message.save()
        .then(message=>{
            res.json({
                message,
                status:"Sent Successfully"
            })
        })

    })
    .catch(err=>{
        console.error(err)
        res.json({error:err});
    })
})

module.exports = router;