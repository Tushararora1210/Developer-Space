const router = require('express').Router()
const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const auth = require('../auth/requireLogin');
const Notification = require('../models/notifications')
const {Profile}=require('../models/profile');
dotenv.config();

router.get('/protected', auth, (req, res) => {
    res.json(req.user);
})
router.post('/register', (req, res) => {
    const { name, username, email, password } = req.body;
    if (!name || !username || !email || !password) {
        res.status(422).json({ error: "Please enter all the fields" })
    }
    User.find({ $or: [{ email: email }, { username }] })
        .then(user => {
            console.log(user)
            if (user.length) {

                res.status(422).json({ error: "User with this email or username already exists" })
            }
            bcrypt.hash(password, 10)
                .then((hashedpassword) => {
                    const saveduser = new User({
                        name, email, username, password: hashedpassword
                    })
                    saveduser.save();
                    console.log(saveduser._id);
                    const notification = new Notification({
                        user: saveduser._id
                    })
                    notification.save();
                    const profile=new Profile({
                        user:saveduser._id
                    })
                    profile.save();
                    const token = jwt.sign({ id: saveduser._id }, process.env.JWT_SECRET_KEY)
                    console.log("User saved Successfully")
                    res.json({ token: token })
                })
                .catch(error => {
                    console.log(error)
                    res.json({ Error: error })
                })


        })
        .catch(error => {
            console.error(error);
            res.json({ Error: error })
        })


})
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    User.find({ email })
        .then(saveduser => {
            console.log(saveduser)
            if (!saveduser.length) {
                return res.status(422).json({ error: "Invalid email or password" })
            }
            bcrypt.compare(password, saveduser[0].password)
                .then(result => {
                    if (result) {
                        const token = jwt.sign({ id: saveduser[0]._id }, process.env.JWT_SECRET_KEY)
                        console.log("Login successfull")
                        const user = jwt.verify(token, process.env.JWT_SECRET_KEY)
                        return res.json({ token, user })
                    }
                    return res.status(422).json({ error: "Invalid email or password" })
                })
                .catch(err => {
                    console.error(err);
                    return res.status(422).json({ error: err })
                })
        })
})
module.exports = router;