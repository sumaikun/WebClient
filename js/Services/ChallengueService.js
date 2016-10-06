app.factory('ChallengueResource',['$http','$q',function($http,$q){
	
	var ChallengueResource = {};
    var defered = $q.defer();
    var promise = defered.promise;

    ChallengueResource.count = function(){ 
	return $http.get("http://localhost/Gappi/public/list_challengues")
		.success(function(data){
			console.log(data);
			return data;
		})
		.error(function(err){
			return err;
		}); 
	}

	
	
	return ChallengueResource;	
	
}]);
