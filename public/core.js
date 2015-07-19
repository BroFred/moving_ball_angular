var app=angular.module('App',[]);
app.controller('testController',['$scope','$timeout','socketio',function($scope,$timeout,socketio){
    var ball = function(x,y){
        this.x=x;
        this.y=y;
        this.vx=5;
        this.vy=5;
    }
    $scope.oneball=new ball(Math.random()*100+1,$scope.y=Math.random()*100+1);
	$scope.x=Math.random()*100+1;$scope.y=Math.random()*100+1;
    $scope.vx=5;
    $scope.vy=5;
    $scope.x1=0;
    $scope.y1=0;
  	$scope.move=function($event) {
  	switch ($event.keyCode) {
    case 37: // Left
    	$scope.vx=$scope.vx<0 ? $scope.vx: -$scope.vx;
    break;

    case 38: // Up
    	$scope.vy=$scope.vy<0 ? $scope.vy: -$scope.vy;
    break;

    case 39: // Right
    	$scope.vx=$scope.vx>0 ? $scope.vx: -$scope.vx;
    break;

    case 40: // Down
    	$scope.vy=$scope.vy>0 ? $scope.vy: -$scope.vy;
    break;
  	}
	}
    socketio.on(function(data){
        $scope.x1=data[0];
        $scope.y1=data[1];
    });
	var re=function(){
		$timeout(function(){$scope.x=$scope.x+$scope.vx; $scope.x>595||$scope.x<5 ? $scope.vx=$scope.vx*-1:null;
            $scope.y=$scope.y+$scope.vy;$scope.y>595||$scope.y<5 ? $scope.vy=$scope.vy*-1:null;
            socketio.emit([$scope.x,$scope.y],function(){});
            re()}, 30);
	};
    re();
}]);