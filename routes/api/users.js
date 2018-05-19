const express = require('express');
const router = express.Router();

// Loading User Model here
const User = require('../../models/User');
// Gravatar Icon of Profile Pic
const gravatar = require('gravatar');
// Password Encyption Package
const bcrypt = require('bcryptjs');

// @route   GET /api/users/test
// @desc    To test the Users Route
// @access  publice
router.get('/test',(req,res) => (res.status(200).json({"msg": "Users api looks cool"})));

// @route   POST /api/users/register
// @desc    To register a new User
// @access  publice
router.post('/register',(req,res) => {
    // return res.status(200).json(req);
    User
        .findOne({email: req.body.email})
        .then(userErr => {
            if(userErr){
                return res.status(400).json({email: "Email already Exists Bro"});
            }else{
                // Gravatar Profile Image
                const avatarImg = gravatar.url(req.body.email);

                // New User Creation
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar: avatarImg,
                    password: req.body.password
                });

                // To generate Salt
                bcrypt.genSalt(10,(err, salt) => {
                    // To generate Password Hash with Salt
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        newUser.password = hash;
                        // Finally Saving our new User
                        newUser.save()
                            .then((user) => res.status(200).json({response: user}))
                            .catch(err => console.log(err));
                    });
                });
            }
        })
})

module.exports = router;