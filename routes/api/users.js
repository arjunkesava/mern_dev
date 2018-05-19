const express = require('express');
const router = express.Router();

// Loading User Model here
const User = require('../../models/User');
// Gravatar Icon of Profile Pic
const gravatar = require('gravatar');
// Password Encyption Package
const bcrypt = require('bcryptjs');
// JSON Web Token Package
const jwt = require('jsonwebtoken');
// PASSPORT Authentication
const passport = require('passport');
// APP secret Key
const secretKey = require('../../config/keys').secretKey;

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
});

// @route   POST /api/users/login
// @desc    To login/sign in the registered Users
// @access  public
router.post('/login',(req,res) => {
    const email = req.body.email;
    const password = req.body.password;

    User
        .findOne({email})
        .then(user => {
            // Check User Details
            if(!user){
                return res.status(400).json({email: "User Not Found"});
            }
            // Password Check
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(isMatch){
                        // Success Login

                        // Create JWT token Payload
                        const payload = {id: user.id, name: user.name, avatar: user.avatar};
                        jwt.sign(payload,secretKey,{expiresIn: 3600},
                            (err,token) => {
                                res.status(200).json({status: true, token: "Bearer "+ token});
                            });
                    } else {
                        // Failed Login // Redirect
                       return res.status(400).json({password: "Invalid Password Bro"});
                    }
                });
        });
});

// @route   POST /api/users/current
// @desc    Passport Token Authentication is Done Here
// @access  private
router.post('/current', passport.authenticate('jwt',{ session: false }),(req,res) => {
    res.status(200).json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
});

module.exports = router;