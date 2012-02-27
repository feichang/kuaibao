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
				mail.send(email,'','',function(error,success){
					if(success){
						console.log('send to '+email+ 'success');
						res.render('info',{
							title: '订阅成功',
							feed_info: ' 订阅成功！'
						});
					}else{
						console.log(error);
					}
				});
				console.log('send exe finish');
			});
			
		}else{
			res.render('info',{
				title: '已经订阅，无需重复订阅',
				feed_info: ' 已经订阅，无需重复订阅！'
			});
		}
	});
}

function delete_feed(){
	
}

exports.add_feed = add_feed;
exports.delete_feed = delete_feed;