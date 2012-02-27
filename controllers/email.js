//数据
var db = require('../mods/db'),
	Article = db.Article,
	User = db.User;

//引入分享资源
var article = require('./article');

//邮件支持	
var nodemailer = require('nodemailer');

var config = require('../config').config;

nodemailer.SMTP = {
	host: config.mail_host,
	port: config.mail_port,
	use_authentication: config.mail_use_authentication,
	user: config.mail_user,
	pass: config.mail_pass
};

function send_mail(data,cb){
	nodemailer.send_mail(data,function(err,success){
		return cb(err,success);
	});
}

//邮件信息
var Cfg = {
	ADD_FEED_EMAIL_TITLE : '订阅成功 - 快报平台',
	ADD_FEED_EMAIL_CONTENT : '订阅成功<br>地址：http://feed.taobao.net'
}

/**
 * 指定邮箱发送邮件
 * 默认空参数时，发送的为订阅成功邮件
 */
function send(email,title,content,cb){
	var sender = config.mail_sender,
		to = email,
		subject = title || Cfg.ADD_FEED_EMAIL_TITLE,
		html = content || Cfg.ADD_FEED_EMAIL_CONTENT;
	var data = {
		sender: sender,
		to: to,
		subject: subject,
		html: html
	}
	
	send_mail(data, function(error,success){
		return cb(error,success);
	});
}
function send_all(emails,title,content,cb){
	for(var i = 0, l = emails.length; i < l; i += 1 ){
		send(emails[i],title,content,cb);
	}
}
exports.send = send;
exports.send_all = send_all;

