const express = require('express');
const mongoose = require('mongoose');
const Comment = require('../schemas/commentSchema.js');
const Post = require('../schemas/postSchema.js')

const commentRoute = express.Router();

// route to post a new comment using a postid as selector
commentRoute.post('/:postId', (req, res) => {
  const contents = req.body.content;
  const postId = mongoose.Types.ObjectId(req.params.postId);
  try {
    const dPost = Post.findById(postId)
    if (dPost){
      const newComment = new Comment({
        content: contents,
        postId,
      });
      newComment.save((err, comment) => {
        console.log('Saved new comment on post', postId)
        res.status(201).json({ 'message': 'Comment added successfully!'})
      })
    }
    else {
      res.status(400).json({ 'message': 'Post not found!'})
    }

  } catch (error) {
    console.log(error);
    res.status(500).json({ 'message': 'Server error, try again later!' });
  }
});

// route to get a list of all comments on a post using postid as selector
commentRoute.get('/:postId', (req, res) => {
  const dComments = [];
  const postId = mongoose.Types.ObjectId(req.params.postId);
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
  const commentId = mongoose.Types.ObjectId(req.params.commentId);
  const newReply = req.body.newReply;
  try {
    const dComment = Comment.findById(commentId)
    if (!dComment){
      res.status(400).json({ 'message': 'Comment not found!' });
    }
    dComment.replys.push(newReply);
    dComment.save(() => {
      res.status(200).json({ 'message': 'New reply added!'})
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({ 'message': 'Server error, try again later!' });
  }
});

// route to get a list of all replies to a comment using the commentId as parameter
commentRoute.get('/commentId', (req, res) => {
  const commentId = mongoose.Types.ObjectId(req.params.commentId);
  try {
    const dComment = Comment.findById(commentId);
    const replys = dComment.replys
    res.status(200).json({ 'message': replys});
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ 'message': 'Server error, try again later!' });
  }

});

module.exports = commentRoute;
