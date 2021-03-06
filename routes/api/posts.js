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

// @route   POST api/posts/like/:id
// @desc    Add Like to a post
// @access  Private
router.post('/like/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    // Check for POST
                    if(post.likes.filter(like => like._id.toString() === req.user.id).length > 0){
                        return res.status(400).json({ alreadyliked: "User already Liked this post" })
                    }
                    // Adding Like to it
                    post.likes.unshift(req.user.id)
                    // Saving\Updating the post here
                    post.save().then(post => res.status(200).json(post));
                })
                .catch(err => {
                    console.log(err)
                    res.status(404).json({ postnotfound: "No post found" })
                })
        })
});

// @route   POST api/posts/unlike/:id
// @desc    Remove Like to a post
// @access  Private
router.post('/unlike/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    // Check for POST
                    if(post.likes.filter(like => like._id.toString() === req.user.id).length === 0){
                        return res.status(400).json({ notliked: "You haven`t Liked this post" })
                    }
                    // Finding the Index of the userId to Unlike It
                    const removeIndex = post.likes
                        .map(item => item._id.toString())
                        .indexOf(req.user.id);
                    // Splice the Like here
                    post.likes.splice(removeIndex, 1);
                    // Save the post finally
                    post.save().then(post => res.status(200).json(post));
                })
                .catch(err => {
                    console.log(err)
                    res.status(404).json({ postnotfound: "No post found" })
                })
        })
});

// @route   POST api/posts/comment/:id
// @desc    Add comment to post
// @access  Private
router.post('/comment/:id',passport.authenticate('jwt', { session: false }),(req, res) => {
    const { errors, isValid } = validationPostInput(req.body);
  
    // Check Validation
    if (!isValid) {
    // If any errors, send 400 with errors object
    return res.status(400).json(errors);
    }

    Post.findById(req.params.id)
    .then(post => {
        const newComment = {
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
        };

        // Add to comments array
        post.comments.unshift(newComment);

        // Save
        post.save().then(post => res.json(post));
    })
    .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
});  

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Comment to a post
// @access  Private
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            // Check to see if Comment Exists
            if(post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0){
                return res.status(400).json({ commentnotexists: "Comment does not exist" })
            }
            // Find index to delete post
            const removeIndex = post.comments
                .map(item => item._id.toString())
                .indexOf(req.params.comment_id);
            // Adding that to the post
            post.comments.splice(removeIndex, 1);
            // Save the post finally
            post.save().then(post => res.status(200).json(post));
        })
        .catch(post => res.status(404).json({ postnotfound: "No post found" }))
});

module.exports = router;