var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var db       = mongoose.connect('mongodb://127.0.0.1/feed11');

mongoose.model('user', new Schema({
  username: String
 ,email : String
 ,counter: Number
}));
mongoose.model('article', new Schema({
  title	: String
 ,url: String
 ,note: String
 ,author: String
 ,tag: [String]
 ,date: Date
}));

var User = db.model('user');
var Article = db.model('article');

exports.User = User;
exports.Article = Article;