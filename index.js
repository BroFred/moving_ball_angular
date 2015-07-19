var express= require('express');
var app=express();
var http=require('http').Server(app);
var io=require('socket.io')(http);;
io.on('connection',function(socket){
	console.log('join');
	socket.on('location',function(data){
		io.emit('mirro',[600-data[0],600-data[1]]);
	});
});
app.use(express.static('public'));
http.listen(3000,function(){console.log("listen 3000")});
