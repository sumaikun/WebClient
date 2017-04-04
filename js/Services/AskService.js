app.factory('AskResource',['$http','$q',function($http,$q){
	
	var AskResource = {};
    var defered = $q.defer();
    var promise = defered.promise;

    AskResource.getAsk = function(){ 
	 return $http.get("http://localhost/Eappi/public/generate_rule3question")
		.success(function(data){
        	console.log('funcion enviada');
        	return data;
        	//defered.resolve(data);
    	})
    		.error(function(err){
    		return err;	
        	//defered.reject(err);
    	});
	}

	AskResource.sendAns = function(id,answer){ 
	 return $http.get("http://localhost/Eappi/public/qualify_ask/"+id+"/"+answer)
		.success(function(data){
        	console.log('funcion enviada');
        	return data;
        	//defered.resolve(data);
    	})
    		.error(function(err){
    		return err;	
        	//defered.reject(err);
    	});
	}
		
	
	return AskResource;	
	
}]);
