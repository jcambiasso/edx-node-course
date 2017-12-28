const validate = require('../data/validation.js');

module.exports = {
    checkPosts(req,res,next)
    {
        let data = req.database.data.posts[req.params.id]
        if(data == null || data == "")
        {
            err = new Error("Post is non existant");
            err.status = 404;
            next(err);
        }
        else
        {
            next();
        }
    },
    checkUser(req,res,next)
    {
        //Placeholder for user authentication.
        next();
    },
    getPosts(req,res){
        if(Object.keys(req.params).length === 0 && req.params.constructor === Object)
        {
            res.status('200');
            res.json(req.database.data.posts);
        }
        else
        {
            let data = req.database.data.posts[req.params.id]
            res.status('200');
            res.json(data);
        }
    },
    addPost(req,res){
        validate(undefined,req.body,req.database.schemas.post,(err,newpost)=>
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
                req.database.data.posts.push(Object.assign({},newpost));
                res.status('200');
                res.send(`${req.database.data.posts.length}`);
            }
        });         
    },
    updatePost(req,res)
    {
        validate(req.database.data.posts[req.params.id],req.body,req.database.schemas.post,(err,newpost)=>
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
                Object.assign(req.database.data.posts[req.params.id],newpost);
                res.status('200').end();
            }
        });
    },
    removePost(req,res)
    {
        req.database.data.posts.splice(req.params.id,1);
        res.status('200').end();
    }
}