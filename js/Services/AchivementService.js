app.factory('AchivementResource',['$http','$q',function($http,$q){
	
	var AchivementResource = {};
    var defered = $q.defer();
    var promise = defered.promise;

    AchivementResource.count = function(){ 
	 $http.get("http://localhost/Gappi/public/list_achivements")
		.success(function(data){
			console.log(data);
			defered.resolve(data);
		})
		.error(function(err){
			defered.reject(err);
		});
		return promise; 
	}

		
	
	return AchivementResource;	
	
}]);
