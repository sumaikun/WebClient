app.controller('UserController',['$scope','UserResource','$window',function($scope,UserResource,$window){
		
		$scope.title = 'Usuario';
		$scope.connect = {} ;
		$scope.User = {} ;
		$scope.Credentials = {};
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
					console.log($scope.connect);
					$window.location.href = "http://localhost/WebClient/main_page.html";
			},function(error){
				console.log('error');
				$scope.connect = {message: 'Ha ocurrido un error consiguiendo los datos de usuario'}
			});
		}

		$scope.SignOut = function(){
			var request = UserResource.logout($scope.User);		
				request.then(function(response){
					console.log('success');
					
					$window.location.href = "http://localhost/WebClient/index.html";
			},function(error){
				console.log('error');
				$scope.connect = {message: 'Ha ocurrido un error quitando la sesión'}
			});
		} 


		// Clases onload

		var currentLocation = window.location;

		var init = function () {
			
			console.log(currentLocation.href);
   			var request = UserResource.credentials();		
				request.then(function(response){
					console.log('success');
					$scope.Credentials = response;
					//Validacion de autenticación
					if($scope.Credentials.id==null){
						$window.location.href = "http://localhost/WebClient/index.html";

					}
			},function(error){
				console.log('error');
				$scope.connect = {message: 'Ha ocurrido un error'}
			});
		};

		if(currentLocation!="http://localhost/WebClient/index.html")
		{init();}	
		 

	  // Con esta funcion pregunto los datos de usuario.
	  //hay un problema puesta que sobreescribe response
	  	 
}]);