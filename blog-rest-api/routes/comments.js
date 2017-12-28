const validate = require('../data/validation.js');

module.exports = {
    checkComment(req,res,next)
    {
        let data = req.database.data.posts[req.params.postId].comments[req.params.commentId]
        if(data == null || data == "" || typeof(data)=='undefined')
        {
            err = new Error("Comment is non existant");
            err.status = 404;
            next(err);
        }
        else
        {
            next();
        }
    },
    getComments(req,res){
        if(!('commentId' in req.params))
        {
            res.status('200');
            res.json(req.database.data.posts[req.params.postId].comments);
        }
        else
        {
            let data = req.database.data.posts[req.params.postId].comments[req.params.commentId];
            res.status('200');
            res.json(data);
        }
    },
    addComments(req,res){
        validate(undefined,req.body,req.database.schemas.comment,(err,newpost)=>
        {
            if(err)
            {
                if(err.name = "Validation")
                {
                    res.status('400'); //Bad request
                    res.json(err.errors);
                }
                else if(error.name = "Schema")
                {
                    res.status('500').end();
                }
            }
            else
            {
                req.database.data.posts[req.params.postId].comments.push(Object.assign({},newpost));
                res.status('200');
                res.send(`${req.database.data.posts[req.params.postId].comments.length}`);
            }
        });   
    },
    updateComments(req,res)
    {
        validate(req.database.data.posts[req.params.postId].comments[req.params.commentId],req.body,req.database.schemas.comment,(err,newpost)=>
        {
            if(err)
            {
                if(err.name = "Validation")
                {
                    res.status('400'); //Bad request
                    res.json(err.errors);
                }
                else if(error.name = "Schema")
                {
                    res.status('500').end();
                }
            }
            else
            {
                Object.assign(req.database.data.posts[req.params.postId].comments[req.params.commentId],newpost);
                res.status('200').end();
            }
        });
    },
    removeComments(req,res)
    {
        req.database.data.posts[req.params.postId].comments.splice(req.params.commentId,1);
        res.status('200').end();
    }
}