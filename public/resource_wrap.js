app.factory('resource', function resourceFactory($resource){
	 var resource = $resource('/map/:id',{id: "@id"}, 
              {
                getMap: { method: "GET", params: {} },
                CreateMap: { method: "POST", params: {} },                            
              });
	 return resource;
});