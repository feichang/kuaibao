//数据
var db = require('../mods/db'),
	Article = db.Article,
	User = db.User;

//引入分享资源
var article = require('./article');

//邮件支持	
var nodemailer = require('nodemailer');

//邮件信息
var Cfg = {
	FROM: '快报平台 <veryued@gmail.com>',
	ADD_FEED_EMAIL_TITLE : '订阅成功 - 快报平台',
	ADD_FEED_EMAIL_CONTENT : '订阅成功<br>地址：http://feed.taobao.net'
}

/**
 * 指定邮箱发送邮件
 * 默认空参数时，发送的为订阅成功邮件
 */
function send(email,title,content){
	// Create a SMTP transport object
	var transport = nodemailer.createTransport("SMTP", {
	    service: 'Gmail', // use well known service
	    auth: {
	        user: "@gmail.com",
	        pass: ""
	    }
	});
	console.log('SMTP Configured');
	nodemailer.sendMail({
		transport: transport, 
	    from: Cfg.FROM,
	    to: email,
	    subject: title || Cfg.ADD_FEED_EMAIL_TITLE,
	    headers: {
	        'X-Laziness-level': 1000,
	    },
	    text: title || Cfg.ADD_FEED_EMAIL_TITLE,
	    html: content || Cfg.ADD_FEED_EMAIL_CONTENT
	}, function(error){
		if(error){
	        console.log('Error occured');
	        console.log(error.message);
	        return;
	    }
	    console.log('Message sent successfully!');
	    transport.close(); // close the connection pool
	});
}
function send_all(emails,title,content){
	for(var i = 0, l = emails.length; i < l; i += 1 ){
		send(emails[i],title,content);
	}
}
exports.send = send;
exports.send_all = send_all;

