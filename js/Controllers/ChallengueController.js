app.controller('ChallengueController',['$scope','ChallengueResource','$window','$compile',function($scope,ChallengueResource,$window,$compile){
		
		$scope.title = 'Retos';
		$scope.col_row = '';
		$scope.connect = {};
		$scope.question = {};
		$scope.list_challen = {};
		$scope.helpindex = 0;
		$scope.percent = 0;
		$scope.time_aut = 'unauthorized';
		$scope.copy_aut = 'unauthorized';
		$scope.ask_id = 0;



		function notify(){
			console.log('I hope a miracle');
		}

		
		//funcion para relizar calificacion al darle al boton enviar
		$scope.send = function(){			
			var request = ChallengueResource.qualify($scope.percent,$scope.ask_id);
			request.success(function(response)
			{
				$scope.stop_timer();
				$scope.timer('x');
				//$scope.timer_clean();

			});
			request.error(function(error){
				console.log('error');
				$scope.connect = {message: 'Ha ocurrido un error'}
			});
		}

		//funcion para cuando se acaba el tiempo , parece que esta función es leida de otra manera por parte de el navegador 
		//por lo tanto no puede compartir variables con otras funciones
		$scope.timer_send = function(){		
			if($('#type_answer').val()!='manual')
			{			
				var request = ChallengueResource.qualify($('#val_score').val(),$('#ans_id').val());
				request.success(function(response)
				{
					

				});
				request.error(function(error){
					console.log('error');
					$scope.connect = {message: 'Ha ocurrido un error'}
				});
				alert('Se acabo el tiempo');
				$("#myModal .close").click();
			}		
		}

		//Me toco asi por que no sobreescribe la variable para detener el proceso del timer
		$scope.stop_timer = function(){
			$('#type_answer').val('manual');			
		}


		//función encargada de analizar el timer.
		$scope.begin = function(){

			if($scope.copy_aut!=$scope.time_aut)
			{ 		
				$('#type_answer').val('automatico');	
				$('#send_button').prop( "disabled", false );
				$scope.copy_aut=$scope.time_aut;				
				console.log('inicia el timer');
				$scope.timer(30);
				$('#ans_id').val($scope.ask_id);
			}
			else {

				$('#val_score').val($scope.percent);
			}
		}


		
		//Busqueda de los retos y generación de preguntas	
		$scope.generate = function(id){	

			//console.log('id relacionado '+id);
			$scope.question.title = $scope.col_row[(id-1)].titulo;			
			var requestx = ChallengueResource.begin(id);
			requestx.success(function(response){
				$scope.list_challen = response;
				$scope.ask_id = id;
			});
			requestx.error(function(error){

			}) 	
			$scope.copy_aut = 'unauthorized';
			$scope.timer_clean();	
			$scope.percent = 0;
			
			$('#send_button').prop( "disabled", true );
			//console.log(JSON.stringify(requestx)); 
			//console.log('lista :'+JSON.stringify($scope.list_cha, null, 4));
			
		}

		//Construir slider de preguntas
		$scope.currentIndex = 0;
		$scope.setCurrentSlideIndex = function (index) {
    	    $scope.currentIndex = index;
    	};
    	$scope.isCurrentSlideIndex = function (index) {
        	return $scope.currentIndex === index;
    	};

	    $scope.prevSlide = function () {
        	$scope.currentIndex = ($scope.currentIndex < $scope.list_challen.length - 1) ? ++$scope.currentIndex : 0;
    	};
    	$scope.nextSlide = function () {
        	$scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.list_challen.length - 1;
    	}; 

		//Función para generar la matriz 

		var init = function () {			
   			var request = ChallengueResource.count();		
				request.then(function(response){
					console.log('success');
					//console.log('success'+JSON.stringify(request));	
					$scope.col_row = response;
					forms();
					
			},function(error){
				console.log('error');
				$scope.connect = {message: 'Ha ocurrido un error'}
			});


		};

		//Instancia que ejecuta init
		init();
		//En este punto inicializare todas las funciones asociadas al onload de una pagina para inicializar plugin
		execute_carousel();
		

		//Función encargada de generar el html de la matriz de retos
		var forms = function () {			 
                                      
			html = "<table>"

             for(var j=0;j<10;j++)
             {
             	html += "<tr>"
	                for(var i=0;i<10;i++)
	                { 
	                      
		                if(((j*10)+i)<Object.keys($scope.col_row).length)
		                {
		           			html+="<td style='text-align:center; background-color:"+$scope.col_row[(j*10)+i].color+";' >" 
		                	html+="<div class='block' ng-click='generate("+$scope.col_row[(j*10)+i].id+")'  title='"+$scope.col_row[(j*10)+i].titulo+"' data-toggle='modal' data-target='#myModal'></div>"   
		                	html+="</td>" 	
		                }
		                //llenado artificial
		                else{
		                	rand = numeroAleatorio(0,10);
		                	html+="<td style='text-align:center; background-color:"+$scope.col_row[rand].color+";' >" 
		                	html+="<div class='block' ng-click='generate("+$scope.col_row[rand].id+")'  title='"+$scope.col_row[rand].titulo+"' data-toggle='modal' data-target='#myModal'></div>"   
		                	html+="</td>"	
		                }         
	               
	                          
	                } 
                html += "</tr>"
              }

            html = html+"</table>";
                
              document.getElementById("table_matriz").innerHTML=html;

              $compile( document.getElementById('table_matriz') )($scope);
		}

        //Función que se encarga de insertar la directiva timer dado un evento
	  	$scope.timer = function(time){

	  		 html = "Tiempo restante <span secondstimer=''  value='"+time+"' style='font-size:150%; font-weight:bold; font-family:serif;''>&nbsp;</span>"

	  		 document.getElementById("timer").innerHTML=html;

              $compile( document.getElementById('timer') )($scope);  
	  	}

	  	//Limpia el timer
	  	$scope.timer_clean = function(){
			html = "timer"

	  		 document.getElementById("timer").innerHTML=html;

	  	}

	  	//solo debe instanciarse una vez para iniciar el timer en reversa
	  	$scope.timer_authorize = function(){
	  		$scope.time_aut = 'authorized';
	  		$scope.begin();
	  	}

	  	//Genera un evento en la pagina si la respuesta es verdadera o falsa
		$scope.check_ans = function(user_ans,sys_ans){
			//console.log('user '+user_ans+'system '+sys_ans);
			if(parseFloat(user_ans)==parseFloat(sys_ans)&&$scope.percent<100){
				$scope.percent += 10;
			}
		}

	//llenado artificial	
	function numeroAleatorio(min, max) {
  		return Math.round(Math.random() * (max - min) + min);
	}		

}]);