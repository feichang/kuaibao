
/**
 * Module dependencies.
 */

var express = require('express'),
	routes = require('./routes'),

//数据
	db = require('./mods/db'),
	Article = db.Article,
	User = db.User;
	
//邮件
var mail = require('./controllers/email');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', routes.page_index);
app.get('/history',routes.page_history);
app.get('/share', routes.page_share);
app.get('/feed', routes.page_feed);
app.post('/addArticle', routes.add_article);
app.post('/addFeed', routes.add_feed);
app.post('/getNewsByDate', routes.read_by_date);

/**
 * 获取当日快报
 */
var feed_today = '';
function getFeed(){
	feed_today = '<table><thead><tr><td>#</td><td>标题</td><td>分享着</td><td>备注</td><td>标签</td><tbody>';
	Article.find({'date': new Date().toDateString()},function(err,docs){
		for(var item in docs){
			feed_today += '<tr><td>#</td><td>'+item.title+'</td><td>'+item.author+'</td><td>'+item.note+'</td><td>'+item.tag+'</td></tr>';
		}
		feed_today += '</tbody></table>';
	});
}
/**
 * 定点发送邮件
 * @time 周一到周五 14:33:15 发送
 */
var cronJob = require('cron').CronJob;
cronJob('00 44 16 * * 2-6', function(){
	feed_today = '<h2>今日快报</h2><table><thead><tr><td>#</td><td>标题</td><td>分享着</td><td>备注</td><td>标签</td><tbody>';
	Article.find({'date': new Date().toDateString()},function(err,docs){
		for(var i in docs){
			if(docs[i].title && docs[i].url){
				feed_today += '<tr><td>#</td><td><a href="'+docs[i].url+'" target="_blank">'+docs[i].title+'</a></td><td>'+docs[i].author+'</td><td>'+docs[i].note+'</td><td>'+docs[i].tag+'</td></tr>';
			}
		}
		feed_today += '</tbody></table><p>来源：快报平台 http://feed.taobao.net</p>';
		User.find({},function(err,users){
			//console.log(users);
			//mail.send_all(users,'今日快报 - 快报平台',feed_today);
			var title = 'IT News Today';
			for(var i in users){
				(function(i){
					mail.send(users[i].email,title,feed_today,function(error,success){
						if(success){
							console.log('发送给 '+ users[i].email +'成功');
						}else{
							console.log(error);
						}
					});
				})(i);
			}
		});
	});
});

app.listen(80);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
