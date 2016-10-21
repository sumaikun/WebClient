app.factory('ChallengueResource',['$http','$q',function($http,$q){
	
	var ChallengueResource = {};
    var defered = $q.defer();
    var promise = defered.promise;

    ChallengueResource.count = function(){ 
	 $http.get("http://localhost/Gappi/public/list_challengues")
		.success(function(data){
			console.log(data);
			defered.resolve(data);
		})
		.error(function(err){
			defered.reject(err);
		});
		return promise; 
	}

	ChallengueResource.begin = function(id){ 
	 $http.get("http://localhost/Gappi/public/begin_challengues/"+id)
		.success(function(data){
        	console.log('funcion enviada');
        	console.log(data);
        	defered.resolve(data);
    	})
    		.error(function(err){
        	defered.reject(err);
    	});
    
    	return promise;
	}	
	
	return ChallengueResource;	
	
}]);
