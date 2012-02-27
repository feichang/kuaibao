$(document).ready(function(){
	$('.clear_btn').click(function(e){
		e.stopPropagation();
	});
});

if($('.J_info').length){
	setTimeout(function(){
		window.location.href = 'http://feed.taobao.net';
	},5000);
}

if($('#canlendar')){
	$('#calendar').fullCalendar({
	    dayClick: function(date){
	    	$.post('/getNewsByDate',{
	    		'time': date.toDateString()
	    	}, function(d){
	    		var doc = d.doc;
	    		var data = '<table class="table table-striped"><thead><tr><th>#</th><th>标题</th><th>分享着</th><th>备注</th><th>标签</th></tr></thead>';
	    		console.log(doc);
	    		for(var i in doc){
	    			console.log(doc);
	    			if(doc[i].title && doc[i].url){
	    				data += '<tr><td>'+doc[i].date+'</td><td><a href="'+doc[i].url+'" target="_blank">'+doc[i].title+'</a></td><td>'+doc[i].author
	    					+'</td><td>'+doc[i].note+'</td><td>'+doc[i].tag+'</td></tr>';
	    			}
	    		}
	    		data += '</table>';
	    		console.log(data);
	    		$('#calendar').css('display','none');
	    		$('.J_back').css('display','block');
	    		$('#J_date_news').append(data);
	    	},'json');
	    }
	});
}
