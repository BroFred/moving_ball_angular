var express= require('express');
var app=express();
var http=require('http').Server(app);
var io=require('socket.io')(http);
var router=require('./router.js');
var ejs =require('ejs');
//-------> mongo
var mongo=require('mongoose');
mongo.connect('mongodb://localhost/test');
//------->mongo
//------>router
app.use('/map',router);
//------>router
//------->io session 
io.on('connection',function(socket){
	console.log('join',socket.id);
	socket.broadcast.emit('fetch_id',socket.id);
	socket.on('location',function(data){
		socket.broadcast.emit('mirro',[data[0],data[1],socket.id]);
	});
	socket.on('disconnect',function(){
		io.emit('leave',socket.id);
	});
	socket.on('req_collision',function(data){
		socket.broadcast.to(data[2]).emit('collision',data);
	});
});
//-------->io sesssion 
app.use(express.static('public'));
/*app.get('/',function(req,res){
	res.render('test.ejs');
})*/
http.listen(process.env.PORT||3000,function(){console.log("listen 3000")});
