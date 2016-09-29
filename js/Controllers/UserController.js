app.controller('UserController',['$scope','UserResource','$window',function($scope,UserResource,$window){
		
		$scope.title = 'before';
		$scope.connect = {} ;
		$scope.User = {} ;

		$scope.test = function(){
			$scope.title = 'change';
			UserResource.test(function(response){
			console.log('request');
			$scope.title = 'conexión';
			$scope.connect = response;
			});
		}
		$scope.test2 = function(){
			$scope.title = 'Loggin';
		}

		$scope.AuthUser = function(){
			var request = UserResource.login($scope.User);		
				request.then(function(response){
					console.log('success');
					$scope.connect = response;
					$window.location.href = "http://localhost/WebClient/main_page.html";
			},function(error){
				console.log('error');
				$scope.connect = {message: 'Ha ocurrido un error'}
			});
		} 
}]);