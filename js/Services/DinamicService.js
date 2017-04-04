app.factory('DinamicResource',['$http','$q',function($http,$q){
	
	var DinamicResource = {};
    var defered = $q.defer();
    var promise = defered.promise;

    //studentendpoint

    DinamicResource.listStudent = function(){ 
	 return $http.get("https://1-dot-appteachers.appspot.com/_ah/api/studentendpoint/v1/student")
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
	 return $http.delete("https://1-dot-appteachers.appspot.com/_ah/api/studentendpoint/v1/student/"+id)
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
      
    
       $http.post("https://1-dot-appteachers.appspot.com/_ah/api/studentendpoint/v1/student",fd,{
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

       
      
    
       $http.put("https://1-dot-appteachers.appspot.com/_ah/api/studentendpoint/v1/student",fd,{
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
     return $http.get("https://1-dot-appteachers.appspot.com/_ah/api/questionproccesorendpoint/v1/skill")
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

    DinamicResource.listProblems = function(id){ 
     return $http.get("https://1-dot-appteachers.appspot.com/_ah/api/serviceendpoint/v1/problem/"+id)
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
