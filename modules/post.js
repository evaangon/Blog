
 var mongoose = require('mongoose');

 var Post = mongoose.model('Post', {
 	title: String,
 	body: String,
 	date: String,
 });

 module.exports = Post;
