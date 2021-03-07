const router = require('express').Router();
const User = require('../models/users');
const Post = require('../models/posts');
const auth = require('../auth/requireLogin');
const Comment = require('../models/comments');
router.get("/:username", (req, res) => {
    User.find({ username: req.params.username })
        .then((saveduser) => {
            Post.find({ PostedBy: saveduser[0]._id })
                .then(posts => {
                    console.log(posts);
                    res.json({ posts })
                })
        })
        .catch(err => {
            console.error(err);
        })
})


router.post('/createpost', auth, (req, res) => {
    const { title, Description, Image } = req.body;
    if (!title || !Description) {
        res.status(422).json({ error: "title or description is not present" })
    }
    console.log(req.user)
    const post = new Post({ title, Description, PostedBy: req.user[0]._id })
    if (Image) {
        post.Image = Image;
    }
    post.save()
        .then(post => {
            res.json({ post })
        })
        .catch(err => {
            console.error(err);
        })
})

router.get('/like/:postid', auth, (req, res) => {
    Post.find({ _id: req.params.postid })
        .then((foundpost) => {
            if (!foundpost.length) {
                return res.status(422).json({ error: "Post Not Found" })
            }
            foundpost[0].LikedBy.push(req.user[0]._id);
            foundpost[0].save()
                .then(post => {
                    res.json({ post, status: "Successfully liked" })
                })
        })
})

router.post('/comment/:postid', auth, (req, res) => {
    Post.find({ _id: req.params.postid })
        .then((foundpost) => {
            if (!foundpost.length) {
                return res.status(422).json({ error: "Post Not Found" })
            }
            const { commenttext } = req.body
            const comment = new Comment({
                commentedby: req.user._id,
                commenttext
            })
            comment.save()
                .then(comment => {
                    foundpost[0].Comments.push(comment._id);
                    foundpost[0].save()
                        .then(post => {
                            res.json({ post, comment, status: "commented successfully" })
                        })
                })
        })
})
router.get("/getcomment/:commentid", (req, res) => {
    Comment.find({ _id: req.params.commentid })
        .then(comments => {
            res.json({ Comment: comments[0] })
        })
})

module.exports = router;