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
	 return $http.get("http://localhost/Gappi/public/begin_challengues/"+id)
		.success(function(data){
        	console.log('funcion enviada');
        	return data;
        	//defered.resolve(data);
    	})
    		.error(function(err){
    		return err;	
        	//defered.reject(err);
    	});
    
    	//return promise;
	}

	ChallengueResource.qualify = function(score,ask_id){
		console.log('scope percent = '+score);
		qualification = {};
		qualification.score = score;
		qualification.ask_id = ask_id;
		return $http.post("http://localhost/Gappi/public/set_score",qualification)
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
	
	return ChallengueResource;	
	
}]);
