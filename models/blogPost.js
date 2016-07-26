
 var mongoose = require('mongoose');

 var Post = mongoose.model('blogPost', {
 	title: String,
 	body: String,
 	date: String,
 });

 module.exports = Post;
