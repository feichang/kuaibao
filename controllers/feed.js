//数据
var db = require('../mods/db'),
	Article = db.Article,
	User = db.User;

//邮件模块
var mail = require('./email');

function add_feed(req, res){
	var username = req.body.input_name,
		email = req.body.input_email;
		console.log('enter add_feed');
	User.find({'email':email},function(err,users){
		console.log('enter find user');
		if(users.length == 0){
			console.log('enter if');
			var u = new User({
				username: username,
				email: email
			});
			console.log('create u');
			u.save(function(err, doc){
				console.log('save success');
				mail.send(email);
				console.log('send exe finish');
			});
			
			res.redirect('/');
		}else{
			res.redirect('/');
		}
	});
}

function delete_feed(){
	
}

exports.add_feed = add_feed;
exports.delete_feed = delete_feed;