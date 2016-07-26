var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/blog');

var app = express();
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(8080, function() {
    console.log('Server listening at http://localhost:8080');
});

var BlogPost = require('./models/blogPost');

app.get('/blogPosts', function(req,res) {
    BlogPost.find().exec().then(function(blogPosts){
        res.json(blogPosts);
    });
});

app.post('/blogPosts', function(req,res) {
    var post = req.body;
    if(post._id) {
        post.date = Date.now();
        BlogPost.findOneAndUpdate({_id:post._id}, post).exec().then(function () {
        res.json(true);
        });
    } else {
        var blogPost = new BlogPost(req.body);
        blogPost.date = Date.now();
        blogPost.save().then(function() {
            res.json(true);
        });
    };
});

app.delete('/blogPosts/:id', function(req,res) {
    var id = req.params.id;
    BlogPost.findOneAndRemove({_id:id}).exec().then(function() {
        res.json(true);
    });
});
