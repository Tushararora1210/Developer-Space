const router = require('express').Router();
const auth = require('../auth/requireLogin');
const { Profile } = require('../models/profile');
const { Experience } = require('../models/profile');
const User=require('../models/users')
router.get('/myprofile', auth, (req, res) => {
    Profile.find({ user: req.user[0]._id })
        .then((foundprofile) => {
            res.json({ profile: foundprofile[0] })
        })
        .catch(err => {
            res.status(422).json({ error: err })
            console.error(err)
        })
})

router.get('/:username', (req, res) => {
    User.find({username:req.params.username})
    .then((founduser)=>{
        if(!founduser.length)
        {
            return res.status(422).json({error:"User not found"})   
        }
        Profile.find({ user: founduser[0]._id })
        .then((foundprofile) => {
            res.json({ profile: foundprofile[0] })
        })
        .catch(err => {
            res.status(422).json({ error: err })
            console.error(err)
        })
        
    })
})

router.post('/updatemyprofile', auth, (req, res) => {
    const {skills,experience,resume,bio}=req.body
    Profile.find({ user: req.user[0]._id })
        .then((foundprofile) => {
            if(skills)
            {
                foundprofile[0].skills=skills;
            }
            if(experience)
            {
                for(var i=0;i<experience.length;i++)
                {
                    if(experience[i].current)
                    {
                        const newexperience=new Experience({Companyname:experience[i].Companyname,From:experience[i].From})   
                    }
                    const newexperience=new Experience({Companyname:experience[i].Companyname,From:experience[i].From,To:experience[i].To,current:false})
                    foundprofile[0].experience.push(newexperience);
                }
                
            }
            if(resume)
            {
                foundprofile[0].resume=resume;
            }
            if(bio)
            {
                foundprofile[0].bio=bio;
            }
            foundprofile[0].save()
            .then((prof)=>{
                res.json({status:"Profile saved successfully"})
            })
        })
        .catch(err => {
            res.status(422).json({ error: err })
            console.error(err)
        })
})

module.exports = router;