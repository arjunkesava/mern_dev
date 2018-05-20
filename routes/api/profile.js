const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Profile Model
const Profile = require('../../models/Profile');
// Load User Model
const User = require('../../models/User');
// Server End Validation Call
const validateProfileInput = require('../../validation/profile');

// @route   GET api/profile/test
// @desc    Profile Test API
// @access  Public
// router.get('/test',(req,res) => (res.json(200,{"msg": "Profile api looks cool"})));

// @route   POST /api/profile
// @desc    Passport Token Authentication is Done Here
// @access  private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
        .populate('user', ['name', 'email', 'avatar'])
        .then(profile => {
            if(!profile){
                errors.noprofile = "There is no profile"
                return res.status(404).json(errors);
            }
            res.status(200).json(profile);
        })
        .catch(err => res.status(404).json(err));
});

// @route   POST api/profile/
// @desc    Profile Test API
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    // Server End Validations
    const { errors, isValid } = validateProfileInput(req.body);
    // Check them here
    if(!isValid)
        return res.status(400).json(errors);

    const profileFields = {};
    profileFields.user = req.user.id;

    if(req.body.handle)     profileFields.handle = req.body.handle;
    if(req.body.company)    profileFields.company = req.body.company;
    if(req.body.website)    profileFields.website = req.body.website;
    if(req.body.location)   profileFields.location = req.body.location;
    if(req.body.status)     profileFields.status = req.body.status;
    if(req.body.bio)        profileFields.bio = req.body.bio;
    if(req.body.githubusername) profileFields.githubusername = req.body.githubusername;

    // Skills Set
    if(req.body.skills !== 'undefined')
        profileFields.skills = req.body.skills.split(',');
    
    // Social Accounts
    profileFields.social = {};
    if(req.body.youtube)    profileFields.social.youtube = req.body.youtube;
    if(req.body.twitter)    profileFields.social.twitter = req.body.twitter;
    if(req.body.facebook)    profileFields.social.facebook = req.body.facebook;
    if(req.body.linkedin)    profileFields.social.linkedin = req.body.linkedin;
    if(req.body.instagram)    profileFields.social.instagram = req.body.instagram;

    Profile.findOne({ user: req.user.id })
        .then(profile => {
            if(profile){
                // Updation Process
                Profile.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: profileFields },
                    { new: true }
                )
                .then(profile => res.json(profile))
                .catch(err => res.status(400).json(err));
            } else {
                // Creation Process
                
                // Initiall we check the handle uniqueness
                Profile.findOne({ handle: profileFields.handle })
                    .then(profile => {
                        if(profile){
                            errors.handle = "Not a unique Handle";
                            return res.status(400).json(errors);
                        }
                        // Save Profile of the User
                        new Profile(profileFields).save().then(profile => res.status(200).json(profile));
                    })
            }
        })




});

module.exports = router;