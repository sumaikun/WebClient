app.controller('AskController',['$scope','AskResource','$window','$compile','cfpLoadingBar',function($scope,AskResource,$window,$compile,cfpLoadingBar){
	
	$scope.connect = {};
	$scope.question = {};
	$scope.ans = '';
	question_carousel();
	$scope.title = 'Demo';

	$scope.start = function(){
      cfpLoadingBar.start();
    };

    $scope.complete = function () {
      cfpLoadingBar.complete();
    }


    $scope.get_ask = function(){			
		var request = AskResource.getAsk();
		request.success(function(response)
		{
			$("#response_animation").empty();
			$scope.connect = {message: 'Pregunta Generada'};
			$scope.question = response;
			$("#Ask_title").empty();
			$("#Ask_content").empty();
			$("#Ask_title").append($scope.question.titulo);
			$("#Ask_content").append($scope.question.Enunciado);
			$("#Ask_content").append('<br>');
				

		});
		request.error(function(error){
			console.log('error');
			$scope.connect = {message: 'Ha ocurrido un error'}
		});
	}

	$scope.send_answer = function(){
		//console.log('datos a mandar :'+$scope.question.id+'mi ans '+$scope.ans_ask);
		//return null;
		var request = AskResource.sendAns($scope.question.id,$scope.ans_ask);
		request.success(function(response)
		{		
			$scope.ans = response;
			if($scope.ans.message=='Correcto')
			{
				$("#response_animation").append("<div class='checkmark-circle'><div class='background' style='height:90%;width:90%'></div><div class='checkmark draw'></div></div>");			
			}
		});
		request.error(function(error){
			console.log('error');
			$scope.connect = {message: 'Ha ocurrido un error'}
		});	
	}


    

}]);