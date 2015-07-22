app.factory('socketio',['$rootScope',function socketioFactory($rootScope){
	var socket=io('localhost:3000');
	return{
		on :function(event,callback){
			socket.on(event,function(){
				var arg=arguments;
				callback.apply(socket,arg);
			});
		},
		emit :function(event,data,callback){
			socket.emit(event,data,function(){
				var arg=arguments;
				$rootScope.$apply(function(){callback.apply(socket,arg)});
			});
		}
	};
}]);