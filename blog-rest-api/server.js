const express = require('express');
const bodyParser = require('body-parser');
const logger= require('morgan');
const path = require('path');
const store = require('./data/store.js');
const routes = require('./routes');
const port = 3000;

//Express setup
app = express();
app.set('port',port);


//Global Middlewares
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Middleware to attach the "dababase" to every request
app.use((req,res,next)=>{
    req.database = store;
    next();
});

app.use('/posts',routes.posts.checkUser);
app.get('/posts',routes.posts.getPosts);
app.post('/posts',routes.posts.addPost);
//Middleware for checking user (not implemented) and existence of post for every /post/X route.
app.use('/posts/:id',routes.posts.checkPosts);
app.get('/posts/:id',routes.posts.getPosts);
app.put('/posts/:id',routes.posts.updatePost);
app.delete('/posts/:id',routes.posts.removePost);
app.get('/posts/:postId/comments',routes.comments.getComments);
app.post('/posts/:postId/comments',routes.comments.addComments);
app.use('/posts/:postId/comments/:commentId',routes.comments.checkComment);
app.get('/posts/:postId/comments/:commentId',routes.comments.getComments);
app.put('/posts/:postId/comments/:commentId',routes.comments.updateComments);
app.delete('/posts/:postId/comments/:commentId',routes.comments.removeComments);


app.all('*',(req,res,next)=>{
    var err = new Error('Not found');
    err.status = 404;
    next(err);
})
app.use((err,req,res,next)=>
{
    res.status(err.status);
    res.send(err.message);
});

app.listen(app.get('port'));