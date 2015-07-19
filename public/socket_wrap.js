app.factory('socketio',['$rootScope',function socketioFactory($rootScope){
	var socket=io('localhost:3000');
	return{
		on :function(callback){
			socket.on('collision',function(){
				var arg=arguments;
				$rootScope.$apply(function(){callback.apply(io,arg)});
			});
			socket.on('mirro',function(){
				var arg=arguments;
				$rootScope.$apply(function(){callback.apply(io,arg)});
			});
		},
		emit :function(data,callback){
			socket.emit('location',data,function(){
				var arg=arguments;
				$rootScope.$apply(function(){callback.apply(io,arg)});
			});
		}
	};
}]);