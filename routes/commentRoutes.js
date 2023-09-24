const express = require('express');
const mongoose = require('mongoose');
const Comment = require('../schemas/commentSchema.js');
const Post = require('../schemas/postSchema.js')

const commentRoute = express.Router();

// route to post a new comment using a postid as selector
commentRoute.post('/:postId', (req, res) => {
  dPost = [];
  contents = req.body.content;
  postId = mongoose.Types.ObjectId(req.params.postId);
  try {
    dPost = Post.findById(postId)
    if (dPost.length != 0){
      newComment = new Comment({
        content: contents,
        postId,
      });
      newComment.save((err, comment) => {
        console.log('Saved new comment on post', postId)
        res.stautus(201).json({ 'message': 'Comment added successfully!'})
      })
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ 'message': 'Server error, try again later!' });
  }
});

// route to get a list of all comments on a post using postid as selector
commentRoute.get('/:postId', (req, res) => {
  dComments = [];
  postId = mongoose.Types.ObjectId(req.params.postId);
  try {
    dComments = Comment.findAll({ postId })
    console.log('Getting all comments for post', postId);
    res.status(200).json({ 'comments': dComments})
  } catch (error) {
    console.log(error);
    res.status(500).json({ 'message': 'Server error, try again later!' });
  }
});

// route to add a new reply to a comment, using the commentId as parameter
commentRoute.post('/:commentId', (req, res) => {

});

// route to get a list of all replies to a comment using the commentId as parameter
commentRoute.get('/commentId', (req, res) => {

});

module.exports = commentRoute;
