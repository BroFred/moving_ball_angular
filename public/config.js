angular.module('App').
config(function($routeProvider,$locationProvider){
	$routeProvider
	.when('/cmap',
    {
      templateUrl: "createMap.html",
      controller: "mapController",
      controllerAs: "mc"
    })
    .otherwise({
        redirectTo: '/'
    });
    $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
    });
});