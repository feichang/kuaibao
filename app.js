
/**
 * Module dependencies.
 */

var express = require('express'),

//数据库
	db = require('./mods/db'),
	Article = db.Article,
	User = db.User;

//邮件支持	
var nodemailer = require('nodemailer');
// Create a SMTP transport object
var transport = nodemailer.createTransport("SMTP", {
        service: 'Gmail', // use well known service
        auth: {
            user: "veryued@gmail.com",
            pass: "a123456788"
        }
    });
console.log('SMTP Configured');

//邮件信息
var message;
function configMsg(user,email,title,content){
	message = {
	    // define transport to deliver this message
	    transport: transport, 
	    // sender info
	    from: 'VeryUED <veryued@gmail.com>',
	    
	    // Comma separated list of recipients
	    to: ''+user+' <'+email+'>',
	    
	    // Subject of the message
	    subject: title,
	
	    headers: {
	        'X-Laziness-level': 1000,
	    },
	
	    // plaintext body
	    text: title,
	    
	    // HTML body
	    html:content
	};
}

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

app.get('/', function(req, res){
	Article.find({'date': new Date().toDateString()},function(err,docs){
		res.render('index', {
			title: '今日快报 - 快报平台',
			result: docs,
			info: '只要订阅快报，快报平台每天晚间11：59会将今日的快报整理发送到你的邮箱中，轻松学习；如果你乐于分享，欢迎你将每日发现分享给UED的所有同学们。'
		});
	});
});

app.get('/history', function(req, res){
	res.render('history', {
		title: '往期快报 - 快报平台'
	});
});

app.get('/share', function(req, res){
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
});

app.get('/feed', function(req, res){
  res.render('feed', {
    title: '订阅快报 - 快报平台'
  });
  //TO DO LIST：添加订阅取消订阅 都需要发送邮件通知
});

app.post('/post', function(req, res){
  var author = req.body.input_author;
  var a = new Article({
  	title: req.body.input_title,
  	url: req.body.input_url,
  	note: req.body.input_note,
  	author: author,
  	tag: req.body.input_tag,
  	date: new Date().toDateString()
  });
  a.save(function(err, doc){
  	res.redirect('/');
  });
});
app.post('/addFeed', function(req, res){
	var username = req.body.input_name,
		email = req.body.input_email;
  var u = new User({
  	username: username,
  	email: email
  });
  u.save(function(err, doc){
  	res.redirect('/');
  	configMsg(username,email,'欢迎订阅快报平台','订阅成功！<br>系统将会每天晚间11：59将今日的快报整理发送到你的邮箱中。<br>也欢迎你分享快报！');
	nodemailer.sendMail(message, function(error){
		if(error){
		    console.log('Error occured');
		    console.log(error.message);
		    return;
		}
		console.log('Message sent successfully!');
		transport.close(); // close the connection pool
		});
	});
});

app.get('/send', function(req, res){
	configMsg('飞长','feichang.wyl@taobao.com','快报平台测试','测试内容测试内容<br>测试内容');
	nodemailer.sendMail(message, function(error){
	    if(error){
	        console.log('Error occured');
	        console.log(error.message);
	        return;
	    }
	    console.log('Message sent successfully!');
	    transport.close(); // close the connection pool
	});
});


//定点发送邮件
function sendMail(){
	setTimeout(arguments.callee,1000);
	if(new Date().toDateString < new Date()){
		
	}
}
sendMail();

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
