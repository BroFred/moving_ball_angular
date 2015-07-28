var ball=function(io,mapArr){
	var Q =require('q');
	var delay=function(socket){
		var s=socket.id;
		var defered =Q.defer();
		setTimeout(function(){
			io.to(s).emit('slowDown');
		},5000);
		defered.resolve(socket);
		return defered.promise;
	}
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
	socket.on('add_obs',function(data){
		mapArr=mapArr.concat(data);
		io.emit('refreshMap',mapArr);
		console.log(mapArr);
	});
	socket.on('sprint',function(){
		delay(socket);
	});
});
}
exports.ball=ball;