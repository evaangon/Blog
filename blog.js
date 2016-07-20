var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/blog');


var app = express();
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.listen(8080, function(){
    console.log('Server listening at http://localhost:8080');
});


var Post = require('./modules/post');

app.get('/posts', function(req,res) {
    Post.find().exec().then(function(posts) {
        res.json(posts);
        });
});
app.post('/posts', function(req,res) {
    var post = new Post(req.body);
    post.date = Date.now();
    post.save().then(function() {
        res.json(true);
        });


});
