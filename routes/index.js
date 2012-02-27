var page = require('../controllers/page');
exports.page_index = page.index;
exports.page_history = page.history;
exports.page_share = page.share;
exports.page_feed = page.feed;

var article = require('../controllers/article');
exports.add_article = article.add_article;
exports.read_by_today = article.read_by_today;
exports.read_by_date = article.read_by_date;

var feed = require('../controllers/feed');
exports.add_feed = feed.add_feed;
exports.delete_feed = feed.delete_feed;

var mail = require('../controllers/email');
exports.send = mail.send;
exports.send_all = mail.send_all;
