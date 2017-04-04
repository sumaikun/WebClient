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

}]);