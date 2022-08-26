const express = require('express');
const app = express();
const {expressjwt} = require('express-jwt');
require('dotenv').config();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({
    extended : true
}))
app.use(cors());
app.use(morgan('dev'));

mongoose.connect('mongodb://localhost:27017/dreamDb', ()=>{
    console.log('connected to db');
})

app.use('/auth', require('./routes/authRouter.js'));
app.use('/api', expressjwt({secret : process.env.SECRET, algorithms : ['HS256']}));
app.use('/api/post', require('./routes/postRouter.js'));

app.use((err, req, res, next)=>{
    console.log(err);
    if(err.name === 'UnauthorziedError'){
        res.status(err.status)
    }
    return res.send({errMsg : err.message});
})

app.listen(port, ()=>{
    console.log(`listen on port ${port}`);
})