app.controller('DinamicController',['$scope','DinamicResource','$window','$compile','cfpLoadingBar',function($scope,DinamicResource,$window,$compile,cfpLoadingBar){
	
	$scope.connect = {};	
	$scope.ans = '';
	question_carousel();
	$scope.title = 'Conexión a otro servidor';
	$scope.students = {};
	$scope.student =  {};
	$scope.editstudent =  {};
	$scope.skills = {};
	$scope.problems = {};
	$scope.question = {};
	$scope.genequestion = {};
	$scope.count = {};

	$scope.start = function(){
      cfpLoadingBar.start();
    };

    $scope.complete = function () {
      cfpLoadingBar.complete();
    }

    //studentendpoint
    $scope.list_students = function(){			
		var request = DinamicResource.listStudent();
		request.success(function(response)
		{
			console.log(response.items);
			$scope.students = response.items;

		});
		request.error(function(error){
			console.log('error');
			$scope.connect = {message: 'Ha ocurrido un error'}
		});
	}

	$scope.list_skills = function(){			
		var request = DinamicResource.listSkill();
		request.success(function(response)
		{
			console.log(response.items);
			$scope.skills = response.items;

		});
		request.error(function(error){
			console.log('error');
			$scope.connect = {message: 'Ha ocurrido un error'}
		});
	}

	var init = function(){
		$scope.list_students();
		$scope.list_skills();
	}
	//inicializar las listas
	init();

	$scope.delete_student= function(code){
		var request = DinamicResource.deleteStudent(code);
		request.success(function(response)
		{
			$scope.connect = {message: 'Usuario eliminado con exito'}
		});
		request.error(function(error){
			console.log('error');
			$scope.connect = {message: 'Ha ocurrido un error'}
		});
	}

	$scope.edit_Student = function(object){
		//console.log(object);
		$("#myModal2").modal('show');
		$("#edit_nameform").val(object.nameStudent);
		$("#edit_lastnameform").val(object.lastNameStudent);
		$("#edit_ageform").val(object.age);
		$("#edit_codeform").val(object.codeStudent);
		$scope.editstudent.name = $("#edit_nameform").val();
		$scope.editstudent.lastname = $("#edit_lastnameform").val();
		$scope.editstudent.age = $("#edit_ageform").val();
		$scope.editstudent.code = $("#edit_codeform").val(); 
	}



	$scope.new_Student = function(){
		var request = DinamicResource.insertStudent($scope.student);
		request.then(function(response)
		{
			$scope.connect = {message: 'Usuario creado con exito'};
			$scope.list_students();
		},function(error){
			console.log('error');
			$scope.connect = {message: 'Ha ocurrido un error'}
		});
	}

	$scope.update_Student = function(){
		console.log($scope.editstudent);
		var request = DinamicResource.updateStudent($scope.editstudent);
		request.then(function(response)
		{
			$scope.connect = {message: 'Usuario editado con exito'};
			$scope.list_students();
		},function(error){
			console.log('error');
			$scope.connect = {message: 'Ha ocurrido un error'}
		});
	}

	$scope.generateQuestion = function(id){
		$scope.question.skill = id;
		$scope.question.student = 5712536552865792;		
		var request = DinamicResource.generateQuestion($scope.question);		
		request.success(function(response)
		{
		    $("#myModal4").modal('show');			
			$scope.genequestion = response;
			console.log('genequestion ');
			console.log($scope.genequestion);

		});
		request.error(function(error){
			console.log('error');
			$scope.connect = {message: 'Ha ocurrido un error'}
		});
	}

	
    $scope.problems_skill = function(id){
    	var request = DinamicResource.listProblems(id);
		request.success(function(response)
		{
			$("#myModal3").modal('show');
			console.log(response.items);
			$scope.problems = response.items;

		});
		request.error(function(error){
			console.log('error');
			$scope.connect = {message: 'Ha ocurrido un error'}
		});
    }

    $scope.qualify = function(){
    	console.log("respuesta ");
    	console.log($scope.ans_ask);
    	//console.log($scope.genequestion);
    	//$("#myModal4").modal('hide');
    	$scope.answer = {};
    	$scope.answer.student =  5712536552865792;
    	$scope.answer.question =  $scope.genequestion.codeQuestion;
    	$scope.answer.answer =  $scope.ans_ask;
    	$scope.count.good = 0; 
    	$scope.count.bad = 0;
    	var request = DinamicResource.qualifyAnswer($scope.answer);
		request.success(function(response)
		{
			$("#response_animation").empty();			
			if(response.grade==1)
			{
				console.log("correcto");
				$("#response_animation").append("<div class='checkmark-circle' style='margin-top:-50px'><div class='background' style='height:90%;width:90%'></div><div class='checkmark draw'></div></div>");
				$("#dynamic_ans").val("");
				$scope.generateQuestion($scope.question.skill);
				scope.count.good += 1; 
			}
			else{
				console.log("incorrecto");
				$scope.count.bad += 1;	
			}			

		});
		request.error(function(error){
			console.log('error');
			$scope.connect = {message: 'Ha ocurrido un error'}
		});
    }

}]);