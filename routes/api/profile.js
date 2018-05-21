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
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');

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

// @route   GET /api/profile/handle/:handle
// @desc    To View Any Single User Profiles by Handle
// @access  public
router.get('/handle/:handle', (req, res) => {
    const errors = {};
    Profile.findOne({ handle: req.params.handle })
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

// @route   GET /api/profile/user/:userId
// @desc    To View Any Single User Profiles by User ID
// @access  public
router.get('/user/:userId', (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.params.userId })
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

// @route   POST api/profile/experience
// @desc    Add Experience to the Profile
// @access  Private
router.post('/experience',passport.authenticate('jwt', { session: false }), (req, res) => {
    // Server End Validation
    const { errors, isValid } = validateExperienceInput(req.body);
    if(!isValid)
        return res.status(404).json(errors);
    
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            const newExperience = {
                title: req.body.title,
                company: req.body.company,
                fromDate: req.body.fromDate,
                toDate: req.body.toDate,
                current: req.body.current,
                description: req.body.description,
                skillsUsed: req.body.skillsUsed, 
            };
            
            // Add Experience
            profile.experience.unshift(newExperience);
            // Save\Update Profile
            profile.save().then(profile => res.status(200).json(profile));
        });
});

// @route   POST api/profile/education
// @desc    Add Education to the Profile
// @access  Private
router.post('/education',passport.authenticate('jwt', { session: false }), (req, res) => {
    // Server End Validation
    const { errors, isValid } = validateEducationInput(req.body);
    if(!isValid)
        return res.status(404).json(errors);
    
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            const newEducation = {
                instituteName: req.body.instituteName,
                degree: req.body.degree,
                fieldOfStudy: req.body.fieldOfStudy,
                fromDate: req.body.fromDate,
                toDate: req.body.toDate,
                current: req.body.current,
                description: req.body.description
            };
            
            // Add Experience
            profile.education.unshift(newEducation);
            // Save\Update Profile
            profile.save().then(profile => res.status(200).json(profile));
        });
});

// @route   DELETE api/profile/experience/:expId
// @desc    Remove Experience from the Profile
// @access  Private
router.delete('/experience/:expId',passport.authenticate('jwt', { session: false }), (req, res) => {

    Profile.findOne({ user: req.user.id })
        .then(profile => {
            // Get Experience Id
            const removeIndex = profile.experience
                .map(item => item.id)
                .indexOf(req.params.expId);
            
            // Splice/Delete Experience
            profile.experience.splice(removeIndex, 1);
            // Save\Update Profile
            profile.save().then(profile => res.status(200).json(profile));
        });
});

// @route   DELETE api/profile/education/:eduId
// @desc    Remove Education from the Profile
// @access  Private
router.delete('/education/:eduId',passport.authenticate('jwt', { session: false }), (req, res) => {

    Profile.findOne({ user: req.user.id })
        .then(profile => {
            // Get Education Id
            const removeIndex = profile.education
                .map(item => item.id)
                .indexOf(req.params.eduId);
            
            // Splice/Delete Education
            profile.education.splice(removeIndex, 1);
            // Save\Update Profile
            profile.save().then(profile => res.status(200).json(profile));
        });
});

// @route   DELETE api/profile
// @desc    Delete User and Profile both
// @access  Private
router.delete('/',passport.authenticate('jwt', { session: false }), (req, res) => {

    // Deleting the Profile here
    Profile.findOneAndRemove({ user: req.user.id })
        .then(() => {
            // Upon Successfull deletion of Profile,
            // we delete the User Data also
            User.findOneAndRemove({ _id: req.user.id })
            .then(() => res.status(200).json({ success: true }));
        });
});

module.exports = router;