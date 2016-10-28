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
		function notify(){
			console.log('I hope a miracle');
		}

		$scope.get = function(){
			alert('reached bitch');
		}


		$scope.begin = function(aut){
			if($scope.copy_aut!=$scope.time_aut)
			{  
				$scope.copy_aut=$scope.time_aut;
				console.log('inicia el timer');
				$scope.timer();
			}
			else{

			}
		}

		$scope.generate = function(id){		
			//console.log('id relacionado '+id);
			$scope.question.title = $scope.col_row[(id-1)].titulo;			
			var requestx = ChallengueResource.begin(id);
			requestx.success(function(response){
				$scope.list_challen = response;
			});
			requestx.error(function(error){

			}) 	
			$scope.copy_aut = 'unauthorized';	
			//console.log(JSON.stringify(requestx)); 
			//console.log('lista :'+JSON.stringify($scope.list_cha, null, 4));
			
		} 

	    $scope.rising = function(px){
			px = px*100;
			return px;			
		}	

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

	
		init();

		var forms = function () {			 
                                      
			html = "<table>"

             for(var j=0;j<10;j++)
             {
             	html += "<tr>"
	                for(var i=0;i<10;i++)
	                { 
	                      
		                if(((j*10)+i)<Object.keys($scope.col_row).length)
		                {
		           			html+="<td style='text-align:center' >" 
		                	html+="<div class='block' ng-click='generate("+$scope.col_row[i].id+")'  title='"+$scope.col_row[i].titulo+"' data-toggle='modal' data-target='#myModal'></div>"   
		                	html+="</td>" 	
		                }         
	               
	                          
	                } 
                html += "</tr>"
              }

            html = html+"</table>";
                
              document.getElementById("table_matriz").innerHTML=html;

              $compile( document.getElementById('table_matriz') )($scope);
		}

	  	$scope.timer = function(){

	  		 html = "Tiempo restante <span secondstimer=''  value='35' style='font-size:150%; font-weight:bold; font-family:serif;''>&nbsp;</span>"

	  		 document.getElementById("timer").innerHTML=html;

              $compile( document.getElementById('timer') )($scope);  
	  	}

	  	$scope.timer_authorize = function(){
	  		$scope.time_aut = 'authorized';
	  		$scope.begin();
	  	}

		$scope.check_ans = function(user_ans,sys_ans){
			console.log('user '+user_ans+'system '+sys_ans);
			if(user_ans==sys_ans){
				$scope.percent += 10;
			}
		}
}]);