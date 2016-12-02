app.controller('AchivementController',['$scope','AchivementResource',function($scope,AchivementResource){
		
		$scope.title = 'Logros';
		$scope.achieves = '';

		var init = function () {			
   			var request = AchivementResource.count();		
				request.then(function(response){
					console.log('success');
					//console.log('success'+JSON.stringify(request));	
					$scope.achieves = response;
					
					
			},function(error){
				console.log('error');
				$scope.connect = {message: 'Ha ocurrido un error'}
			});


		};

		//Instancia que ejecuta init
		init();

}]);