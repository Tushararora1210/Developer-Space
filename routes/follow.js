const router = require('express').Router();
const User = require('../models/users');
const Notification=require('../models/notifications');
const auth = require('../auth/requireLogin');
router.get('/:username', auth, (req, res) => {
    User.find({ username: req.params.username })
        .then((usertobefollowed) => {
            if (!usertobefollowed.length) {
                return res.status(422).json({ error: "User not found" })
            }

            User.find({ username: req.user[0].username })
                .then((loggedinuser) => {
                    if (loggedinuser[0].following.includes(usertobefollowed[0]._id)) {
                        return res.status(422).json({ error: "User already followed" })
                    }
                    if(loggedinuser[0]._id==usertobefollowed[0]._id)
                    {
                        return res.status(422).json({error:"You cannot follow yourselves"})
                    }
                    loggedinuser[0].following.push(usertobefollowed[0]._id);
                    usertobefollowed[0].followers.push(loggedinuser[0]._id);
                    loggedinuser[0].save();
                    usertobefollowed[0].save();
                    const newnotification =new Notification({
                        user:usertobefollowed[0]._id,
                        notificationtext:loggedinuser[0].name+" started following you"
                    })
                    newnotification.save();
                    res.send("Successfully followed")
                })
                .catch(err => {
                    console.error(err)
                    res.status(422).json({ error: err })
                })
        })
        .catch(err => {
            console.error(err);
            res.status(422).json({ error: err })
        })
})

router.get('/followers/:username', (req, res) => {
    User.find({ username: req.params.username })
        .then(userdetails => {
            return res.json({ followers: userdetails[0].followers })
        })
        .catch(err => {
            console.error(err)
            return res.json({ error: err })
        })

})

router.get('/following/:username', (req, res) => {
    User.find({ username: req.params.username })
        .then(userdetails => {
            return res.json({ following: userdetails[0].following })
        })
        .catch(err => {
            console.error(err)
            return res.json({ error: err })
        })

})
module.exports = router;