const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Post = require('../../models/Post');
const Profile = require('../../models/Profile');

// Validation Import
const validationPostInput = require('../../validation/post');

// @route   POST api/posts
// @desc    View all Posts
// @access  Public
router.get('/',(req,res) => {
    Post.find()
        .sort({data: -1})
        .then(posts => res.status(200).json(posts))
        .catch(err => res.status(404).json({ nopostsfound: "No posts found!" }));
})

// @route   POST api/posts/:id
// @desc    View Single Posts
// @access  Public
router.get('/:id',(req,res) => {
    Post.findById(req.params.id)
        .then(post => res.status(200).json(post))
        .catch(err => res.status(404).json({ nopostfound: "No post found!" }));
})

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

// @route   DELETE api/posts/:id
// @desc    Delete Post
// @access  Private
router.delete('/:id',passport.authenticate('jwt',{ session:false }), (req, res) => {
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    // Check for POST
                    if(post.user.toString() !== req.user.id) {
                        return res
                            .status(401)
                            .json({ notauthorized: "You are not authorized to delete the post"});
                    }

                    // Delete
                    post.remove().then(() => res.json({success: true}));
                })
                .catch(post => res.status(404).json({ postnotfound: "No posts found to delete"}))
        })
});

module.exports = router;