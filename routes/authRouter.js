const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authRouter = express.Router();


//sign up
authRouter.post('/signup', (req, res, next)=>{
    User.findOne({username : req.body.username.toLowerCase()}, (err, user)=>{
        if(err){
            res.status(500);
            return res.send(err);
        }

        if(user){
            res.status(403);
            return next(new Error('Username is taken'))
        }

        const newUser = new User(req.body);

        newUser.save((err, user)=>{
            if(err){
                res.status(500);
                return next(err);
            }
        })

        const token = jwt.sign(newUser.withoutPassword(), process.env.SECRET);
        return res.status(201).send({token, user : newUser.withoutPassword()});
    })
})

//login
authRouter.post('/login', (req, res, next)=>{
    
    User.findOne({username : req.body.username.toLowerCase()}, (err, user)=>{
        if(err){
            res.status(500);
            return next(err); 
        }

        if(!user){
            res.status(500);
            return next(new Error("User doesnt exist"));
        }

        user.checkPassword(req.body.password, (err, isMatch)=>{
            if(err){
                res.status(403);
                return next(new Error("Username or password are incorrect"));
            }

            if(!isMatch){
                res.status(403);
                return next(new Error('Username or Password are incorrect'));
            }

            const token = jwt.sign(user.withoutPassword(), process.env.SECRET);
            return res.status(200).send({token, user : user.withoutPassword()});
        })
    })

})


module.exports = authRouter;