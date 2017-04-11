app.controller('ExamsController',['$scope','ExamsResource',function($scope,ExamsResource){
		
		$scope.title = 'Talleres';
		

	var init = function () {			
   			var request = ExamsResource.count_five();		
				request.then(function(response){
					console.log('success');
					//console.log('success'+JSON.stringify(request));	
					$scope.questions = response.data;

					console.log($scope.questions);
					
					
			},function(error){
				console.log('error');
				$scope.connect = {message: 'Ha ocurrido un error'}
			});


		};

		//Instancia que ejecuta init
		init();

	$scope.scores = function(){
		
	}
	 	
}]);