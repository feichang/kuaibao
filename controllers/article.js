//数据
var db = require('../mods/db'),
	Article = db.Article,
	User = db.User;

function read_today(res, page){
	Article.find({'date': new Date().toDateString()},function(err,docs){
		res.render(page, {
			title: '今日快报 - 快报平台',
			result: docs
		});
	});
}
function read_by_date(res, page, time){
	//var time = new Date(2012,1,26).toDateString();
	console.log(time);
	Article.find({'date': time},function(err,docs){
		res.render(page, {
			title: '今日快报 - 快报平台',
			result: docs
		});
	});
}
function add_article(req, res){
	var time = new Date().toDateString();
	var a = new Article({
		title: req.body.input_title,
		url: req.body.input_url,
		note: req.body.input_note,
		author: req.body.input_author,
		tag: req.body.input_tag,
		date: new Date().toDateString()
	});
	a.save(function(err, doc){
		res.redirect('/');
	});
}


exports.read_today = read_today;
exports.read_by_date = read_by_date;
exports.add_article = add_article;

//next version to do
/*
exports.modify_article = modify_article;
exports.delete_article = delete_article;
*/