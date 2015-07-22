var app=angular.module('App',['ngRoute','ngResource']);
app.controller('testController',['$scope','$timeout','socketio','$location','resource',function($scope,$timeout,socketio,$location,resource){
    //---->editMap jump
    $scope.obj=[];
    $scope.addobstacle=function(){
        $scope.obj.push([40,40]);
    }
    $scope.sub=function(){
        var r=resource.save({'obs':$scope.obj},function(){
            //
        });
        socketio.emit('add_obs',$scope.obj);
        $scope.obj=[];
    }
    $scope.editMap=function(){
        $location.path('/cmap');
    }
    //---->logic
    $scope.obst=[];
    var ball = function(x,y){
        this.x=x;
        this.y=y;
    }
	$scope.x=100;$scope.y=100;
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
    socketio.on('refreshMap',function(data){
            $scope.obst=[];
            $scope.obst=data;
            console.log(data);
           console.log($scope.obst);
    });
    socketio.on('collision',function(data){
            $scope.vx=data[0];
            $scope.vy=data[1];
    });
    socketio.on('leave',function(data){ 
        $scope.member[data].x=0;
        $scope.member[data].y=0;
        delete $scope.member[data];
    });
    socketio.on('mirro',function(data){
        if(!$scope.member[data[2]]){
            $scope.member[data[2]]=new ball(20,20);
        }
        $scope.member[data[2]].x=data[0];
        $scope.member[data[2]].y=data[1];
        if(Math.pow((data[0]-$scope.x),2)+Math.pow((data[1]-$scope.y),2)<=200){
            socketio.emit('req_collision',[$scope.vx,$scope.vy,data[2]],function(){});
        }
    });
    var checkE=function(){
        $timeout(function(){
            for(var i in $scope.obst){
                if(Math.abs($scope.obst[i][1]-$scope.y)<10 && $scope.x>$scope.obst[i][0]-10 && $scope.x<$scope.obst[i][0]+60){
                    $scope.vx=-$scope.vx;
                    $scope.vy=-$scope.vy;
                }
            }
       checkE();},8);
    }
    checkE();
	var re=function(){
		$timeout(function(){$scope.x=$scope.x+$scope.vx; $scope.x>595||$scope.x<5? $scope.vx=$scope.vx*-1:null;
            $scope.y=$scope.y+$scope.vy;$scope.y>595||$scope.y<5 ? $scope.vy=$scope.vy*-1:null;
            socketio.emit('location',[$scope.x,$scope.y],function(){});
            re()}, 10);
	};
    re();
    //----> logic
}]);
app.controller('mapController',['$scope','$location','resource',function($scope,$location,resource){

}]);