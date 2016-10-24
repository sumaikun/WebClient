app.controller('ChallengueController',['$scope','ChallengueResource','$window','$compile',function($scope,ChallengueResource,$window,$compile){
		
		$scope.title = 'Retos';
		$scope.col_row = '';
		$scope.connect = {};
		$scope.question = {};
		$scope.list_challen = {};
		$scope.helpindex = 0;

		$scope.generate = function(id){		
			//console.log('id relacionado '+id);
			$scope.question.title = $scope.col_row[id].titulo;			
			var requestx = ChallengueResource.begin(id);
			requestx.success(function(response){
				$scope.list_challen = response;
			});
			requestx.error(function(error){

			}) 		
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

	  	 
		
}]);