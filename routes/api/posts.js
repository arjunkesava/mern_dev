const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Post = require('../../models/Post');

// Validation Import
const validationPostInput = require('../../validation/post');

router.get('/test',(req,res) => (res.json(200,{"msg": "Posts api looks cool"})))

// @route   POST api/posts
// @desc    Create Post
// @access  Private
router.post('/',passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validationPostInput(req.body);

    // Server End Validation of Inputs
    if(!isValid){
        return res.status(400).json(errors);
    }

    const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
    });

    newPost.save().then(post => res.status(200).json(post));
});

module.exports = router;