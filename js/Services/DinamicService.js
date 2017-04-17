app.factory('DinamicResource',['$http','$q',function($http,$q){
	
	var DinamicResource = {};
    var defered = $q.defer();
    var promise = defered.promise;

    //studentendpoint

    DinamicResource.listStudent = function(){ 
	 return $http.get("https://2-dot-appteachers.appspot.com/_ah/api/loginendpoint/v2/student")
		.success(function(data){
        	console.log('funcion enviada');
        	return data;
        	//defered.resolve(data);
    	})
    		.error(function(err){
    		return err;	
        	//defered.reject(err);
    	});
	}

	DinamicResource.deleteStudent = function(id){ 
	 return $http.delete("https://2-dot-appteachers.appspot.com/_ah/api/loginendpoint/v2/student/"+id)
		.success(function(data){
        	console.log('funcion enviada');
        	return data;
        	//defered.resolve(data);
    	})
    		.error(function(err){
    		return err;	
        	//defered.reject(err);
    	});
	}


    DinamicResource.insertStudent = function(data){

        //hay que usar formData cuando se va a subir un archivo.
       var fd = new FormData();
       fd.append('nameStudent', data.name);
       fd.append('lastNameStudent', data.lastname);
       fd.append('age', data.age);
      
    
       $http.post("https://2-dot-appteachers.appspot.com/_ah/api/loginendpoint/v2/student",fd,{
          transformRequest: angular.identity,
          headers: {'Content-Type': undefined}
       })
            
        .success(function(data){

            console.log('funcion enviada');
            defered.resolve(data);
        })
            .error(function(err){
            defered.reject(err);
        });
    
        return promise; 
    }

    DinamicResource.updateStudent = function(data){

        //hay que usar formData cuando se va a subir un archivo.
       
       console.log(data); 
       var fd = new FormData();
       fd.append('nameStudent', data.name);
       fd.append('lastNameStudent', data.lastname);
       fd.append('age', data.age);
       fd.append('codeStudent', data.code);

       
      
    
       $http.put("https://2-dot-appteachers.appspot.com/_ah/api/loginendpoint/v2/student",fd,{
          transformRequest: angular.identity,
          headers: {'Content-Type': undefined}
       })
            
        .success(function(data){

            console.log('funcion enviada');
            defered.resolve(data);
        })
            .error(function(err){
            defered.reject(err);
        });
    
        return promise; 
    }

    DinamicResource.listSkill = function(){ 
     return $http.get("https://2-dot-appteachers.appspot.com/_ah/api/studentendpoint/v2/skill")
        .success(function(data){

            console.log('funcion enviada');
            defered.resolve(data);
        })
            .error(function(err){
            defered.reject(err);
        });
    
        return promise; 
    }

    DinamicResource.listProblems = function(id){ 
     return $http.get("https://2-dot-appteachers.appspot.com/_ah/api/teachersendpoint/v2/problem/"+id)
        .success(function(data){
            console.log('funcion enviada');
            return data;
            //defered.resolve(data);
        })
            .error(function(err){
            return err; 
            //defered.reject(err);
        });
    }

    DinamicResource.generateQuestion = function(data){       
       console.log(data); 
       var fd = new FormData();
       fd.append('codeStudent', data.student);
       fd.append('idSkilll', data.skill);      
    
       return $http.post("https://2-dot-appteachers.appspot.com/_ah/api/studentendpoint/v2/generateQuestion",fd,{
          transformRequest: angular.identity,
          headers: {'Content-Type': undefined}
       })
            
        .success(function(data){
            console.log('funcion enviada pregunta generada');
            return data;
            
        })
            .error(function(err){
            return err; 
            
        }); 
    }

    DinamicResource.qualifyAnswer = function(data){       
       console.log(data); 
       var fd = new FormData();
       fd.append('codeStudent', data.student);
       fd.append('codeQuestion', data.question);
       fd.append('proposedAnswer', data.answer);    
    
       return $http.post("https://2-dot-appteachers.appspot.com/_ah/api/studentendpoint/v2/qualifyAnswer",fd,{
          transformRequest: angular.identity,
          headers: {'Content-Type': undefined}
       })
            
       .success(function(data){
            console.log('funcion enviada');
            return data;
            //defered.resolve(data);
        })
            .error(function(err){
            return err; 
            //defered.reject(err);
        }); 
    }	
	
	return DinamicResource;	
	
}]);
