let store = {
    posts: [
      {name: 'Top 10 ES6 Features every Web Developer must know',
      url: 'https://webapplog.com/es6',
      text: 'This essay will give you a quick introduction to ES6. If you don’t know what is ES6, it’s a new JavaScript implementation.',
      comments: [
            {
                user:"John Michelin",
                text:'Cruel…..var { house, mouse} = No type optimization at all'
            },
            {
                user:"John Doe",
                text:'I think you’re undervaluing the benefit of ‘let’ and ‘const’.'
            },
            {
                user:"Gina Nigri",
                text:'(p1,p2)=>{ … } ,i understand this ,thank you !'
            },
            {
                user:"John Michelin",
                text:'@johndoe wtf we have the same name lol'
            } 
        ]
      }
    ]
  }

const commentSchema = {"id":"/comment",
"type":"object",
"properties":{
    "user": {"type": "string"},
    "text": {"type": "string"}
    },
    "required": ["text"]
};

const postSchema = {
    "id":"/post",
    "type":"object",
    "properties":{
        "name": {"type": "string"},
        "url": {"type": "string"},
        "text": {"type": "string","default":"Enter text"},
        "comments":
            {
                "type":"array",
                "items":{"$ref":"/comment"}
            }
        },
    "required": ["text","name"]
};


module.exports = {data: store, schemas:{post: postSchema, comment: commentSchema}};