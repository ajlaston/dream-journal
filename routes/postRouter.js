const express = require('express');
const postRouter = express.Router();
const Post = require('../models/post');

//get all posts for a specific user
postRouter.get('/all/:userId', (req, res, next)=>{

    Post.find({user : req.params.userId}, (err, posts)=>{
        if(err){
            res.status(500);
            return next(err);
        }

       return res.status(201).send(posts);
    })
})

//get a single post by id
postRouter.get('/:postId', (req, res, next)=>{

    Post.findById({_id : req.params.postId}, (err, post)=>{
        if(err){
            res.status(500);
            return next(err);
        }

        return res.status(201).send(post);
    })
})

//create posts
postRouter.post('/', (req, res, next)=>{
    req.body.user = req.auth._id;

    const newPost = new Post(req.body);

    newPost.save((err, post)=>{

        if(err){
            res.status(500);
            return next(err);
        }

        return res.status(201).send(post);
    })
})

//edit posts
postRouter.put('/:postId', (req, res, next)=>{
    req.body.user = req.auth._id;

    Post.findByIdAndUpdate(
        {_id : req.params.postId},
        req.body,
        {new : true},
        (err, updatedPost)=>{
            if(err){
                res.status(500);
                return next(err);
            }

            return res.status(201).send(updatedPost);
        }
    )
})

//delete post
postRouter.delete('/:postId', (req, res, next)=>{
    Post.findByIdAndDelete({_id : req.params.postId}, (err, deletedPost)=>{
        if(err){
            res.status(500);
            return next(err)
        }

        return res.status(201).send(deletedPost);
    })
})


module.exports = postRouter;