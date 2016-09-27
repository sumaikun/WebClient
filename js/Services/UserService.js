app.factory('UserResource',['$http','$q',function($http,$q){
	
	var UserResource = {};
    var defered = $q.defer();
    var promise = defered.promise;

    UserResource.test = function(){ 
	return $http.get("http://localhost/Gappi/public/User")
		.success(function(data){
			console.log(data);
			return data;
		})
		.error(function(err){
			return err;
		}); 
	}

	UserResource.login = function(dt){
		console.log(dt);
		$http.post("http://localhost/Gappi/public/log",dt)
		.success(function(data){

        	console.log('funcion enviada');
        	defered.resolve(data);
    	})
    		.error(function(err){
        	defered.reject(err);
    	});
    
    	return promise; 
	}
	
	return UserResource;	
	
}]);
