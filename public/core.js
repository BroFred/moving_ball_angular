var app=angular.module('App',[]);
app.controller('testController',['$scope','$timeout','socketio',function($scope,$timeout,socketio){
    var ball = function(x,y){
        this.x=x;
        this.y=y;
    }
	$scope.x=20;$scope.y=20;
    $scope.vx=0;
    $scope.vy=0;
    $scope.member={};
  	$scope.move=function($event) {
  	switch ($event.keyCode) {
    case 37: // Left
    	$scope.vx=Math.max(-5,$scope.vx-1)
    break;

    case 38: // Up
    	$scope.vy=Math.max(-5,$scope.vy-1)
    break;

    case 39: // Right
    	$scope.vx=Math.min(5,$scope.vx+1)
    break;

    case 40: // Down
    	$scope.vy=Math.min(5,$scope.vy+1)
    break;
  	}
	}
    socketio.on('leave',function(data){ 
        $scope.member[data].x=-10;
        $scope.member[data].y=-10;
        delete $scope.member[data];
    });
    socketio.on('mirro',function(data){
        if(!$scope.member[data[2]]){
            $scope.member[data[2]]=new ball(20,20);
        }
        $scope.member[data[2]].x=data[0];
        $scope.member[data[2]].y=data[1];
    });
	var re=function(){
		$timeout(function(){$scope.x=$scope.x+$scope.vx; $scope.x>595||$scope.x<5? $scope.vx=$scope.vx*-1:null;
            $scope.y=$scope.y+$scope.vy;$scope.y>595||$scope.y<5 ? $scope.vy=$scope.vy*-1:null;
            /*if(Math.abs($scope.y-$scope.y1)<7&&($scope.x>=$scope.x1&&$scope.x<=$scope.x1+195)){
                $scope.vy=$scope.vy*-1;
                $scope.y=$scope.y+$scope.vy;
            }*/
            socketio.emit([$scope.x,$scope.y],function(){});
            re()}, 10);
	};
    re();
}]);
