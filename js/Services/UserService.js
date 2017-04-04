app.factory('UserResource',['$http','$q',function($http,$q){
	
	var UserResource = {};
    var defered = $q.defer();
    var promise = defered.promise;

    UserResource.test = function(){ 
	return $http.get("http://localhost/Eappi/public/User")
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
		return $http.post("http://localhost/Eappi/public/log",dt)
		.success(function(data){

        	console.log('service data '+ JSON.stringify(data));
        	return data;
        	//defered.resolve(data);
    	})
    		.error(function(err){
        	return err;
        	//defered.reject(err);
    	});
    
    	//return promise; 
	}

	UserResource.credentials = function(){
		console.log('ejecuto request');
		$http.get("http://localhost/Eappi/public/credentials")
		.success(function(data){

        	console.log('funcion enviada');
        	defered.resolve(data);
    	})
    		.error(function(err){
        	defered.reject(err);
    	});
    
    	return promise;	
	}

	UserResource.logout = function(){
		console.log('ejecuto request');
		$http.get("http://localhost/Eappi/public/LogOut")
		.success(function(data){

        	console.log('funcion enviada');
        	defered.resolve(data);
    	})
    		.error(function(err){
        	defered.reject(err);
    	});
    
    	return promise;	
	}
	
	//console.log('retorno de UserResource '+ JSON.stringify(UserResource));
	return UserResource;	
	
}]);
