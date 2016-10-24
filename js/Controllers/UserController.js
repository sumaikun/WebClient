app.controller('UserController',['$scope','UserResource','$window',function($scope,UserResource,$window){
		
		$scope.title = 'Usuario';
		$scope.connect = {} ;
		$scope.User = {} ;
		$scope.Credentials = {};

	  function reload_js(src) {
        $('script[src="' + src + '"]').remove();
        $('<script>').attr('src', src).appendTo('head');
	    }

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
			
			//console.log('entre al controlador');			 
			var request = UserResource.login($scope.User);
			request.success(function(response)
			{
				console.log('got it');
				$scope.connect = response;
				if($scope.connect.message!="Los datos de inicio estan mal")
				{
					$window.location.href = "http://localhost/WebClient/main_page.html";
					//alert('esta bien');
				}
				else
				{
					//alert('esta mal');
				}

			});
			request.error(function(error){
				console.log('error');
				$scope.connect = {message: 'Ha ocurrido un error consiguiendo los datos de usuario'}
			});
				/*request.then(function(response){
					
					console.log('esta es la response '+JSON.stringify(response));
					//$scope.connect = response;
					// reload_js('js/Controllers/UserController.js');					
					//$window.location.href = "http://localhost/WebClient/main_page.html";

			},function(error){
				console.log('error');
				$scope.connect = {message: 'Ha ocurrido un error consiguiendo los datos de usuario'}
			});*/		 
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