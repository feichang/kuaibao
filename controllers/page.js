//数据库
var db = require('../mods/db'),
	Article = db.Article,
	User = db.User;

var article = require('./article');

function index(req, res){
	article.read_today(res,'index');
	//article.read_by_date(res);
}
function share(req, res){
	User.find({},function(err,docs){
		var rank = [];
		for(var user in docs){
			rank.push(user.counter);
		}
		rank.sort(function compare(a,b){return a-b;});
		console.log(docs);
		res.render('share', {
			title: '分享快报 - 快报平台',
			result: rank
		});
	});
	//TO DO LIST: 分享排行榜
}

function history(req, res){
	//article.read_by_date(res, 'history',time.toDateString());
	res.render('history', {
	    title: '往期快报 - 快报平台'
	  });
}

function feed(req, res){
  res.render('feed', {
    title: '订阅快报 - 快报平台'
  });
  //TO DO LIST：添加订阅取消订阅 都需要发送邮件通知
}

exports.index = index;
exports.share = share;
exports.history = history;
exports.feed = feed;
