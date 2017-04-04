app.factory('ExamsResource',['$http','$q',function($http,$q){
	
	var ExamsResource = {};
    var defered = $q.defer();
    var promise = defered.promise;

    ExamsResource.count_five = function(){ 
	 $http.get("http://localhost/Eappi/public/take_five_questions")
		.success(function(data){
			console.log(data);
			defered.resolve(data);
		})
		.error(function(err){
			defered.reject(err);
		});
		return promise; 
	}

		
	
	return ExamsResource;	
	
}]);
